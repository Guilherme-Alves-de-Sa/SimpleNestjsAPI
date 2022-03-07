import { Injectable, NotImplementedException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UserAuthService } from '../user/user.service';
import { AuthConfigService } from '../config/auth/auth.config.service';
import { AuthenticatedUser } from './auth.types';
import { UserDTO } from '../user/dto/user.dto';



@Injectable()
export class AuthService {
  private logger :Logger;

  constructor(
    private userAuthService: UserAuthService,
    private jwtService: JwtService,
    private authConfig: AuthConfigService,
  ) { 
    this.logger =new Logger('AuthService');    
  }

  // for PASSPORT.LOCAL
  async validateUser(username: string, pass: string): Promise<UserDTO> {
    // get user including passowrd hidden property
    const {userDto, password} = await this.userAuthService.getUserWithPassword(username);

    if((!password) &&( this.authConfig.authSelfService)){
    //   // self registration
    //   user =await this.userAuthService.create( { username: username });
    //   user = await this.setUserPassword(user._id, pass);
    }

    if (password) {
      if (await bcrypt.compare(pass, password) === true) {
        // !REMOVE password from user before returning
        // user.password =undefined
        return userDto;
      }
      return null;
    }
    return null;
  }

  // for PASSPORT.JWT 
  async issueJWT(user: UserDTO) : Promise<string> {
    const payload = { username: user.email, id: user.id, name: `${user.firstname} ${user.lastname}`,
      avatar: user.avatar, sub: user.id
    };
    return this.jwtService.sign(payload);
  }

  //https://datatracker.ietf.org/doc/html/rfc7519#section-4.1
  async validateJwt(payload: any) {
    // this.logger.debug("payload:name="+payload.name);
    // this.logger.debug("payload:sub="+payload.sub);
    // this.logger.debug("payload:iss="+payload.iss);
    // this.logger.debug("payload:aud="+payload.aud);
    // this.logger.debug("payload:exp="+payload.exp);
    // this.logger.debug("payload:alg="+payload.exp);

    const user = await this.userAuthService.getByIdForAuth(payload.sub);
    if(!user){
      return null;
    }

    return user;
  }


  static async hashPassword(p: string) : Promise<string>{
    return bcrypt.hash(p, 10);
  }

  async setUserPassword(username: string, password: string, newPassword: string) : Promise<UserDTO>{
    const user =await this.validateUser(username, password);
    if (!user) { throw new UnauthorizedException(username, "Invalid credentials provided.")}
    const newPasswordHash =await AuthService.hashPassword(newPassword);
    return await this.userAuthService.setPassword(user.id, newPasswordHash);
  }

  
  async login(username: string, password: string) : Promise<AuthenticatedUser> {
    const user =await this.validateUser(username, password);
    if(!user){ throw new UnauthorizedException(username, "Invalid credentials provided.")}
    return { user: user, access_token: await this.issueJWT(user) }
  }

  async authWhiteList(username: string): Promise<AuthenticatedUser> {
    const user =await this.userAuthService.getUserWhiteList(username);
    return { user: user, access_token: await this.issueJWT(user) }
  }

  async renewJWT(){
    throw new NotImplementedException();
  }
  async logout(){
    throw new NotImplementedException();
  }

}