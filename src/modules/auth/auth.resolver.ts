import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserDTO } from "../user/dto/user.dto";
import { AuthenticatedUser, LoginUserInput } from "./auth.types";
import { AuthService } from "./auth.service";

@Resolver(() => AuthenticatedUser)
export class AuthResolver {
  constructor(private authService : AuthService) { }
  
  // AUTHENTICATION USER
  @Mutation(() => AuthenticatedUser)
  async login(@Args('loginInput') payload: LoginUserInput) : Promise<AuthenticatedUser> {
    return this.authService.login(payload.username, payload.password);
  }
  @Mutation(() => UserDTO)
  async setPassword(@Args('loginInput') payload: LoginUserInput,@Args('newPassword') newPassword: string) : Promise<UserDTO>{
    return this.authService.setUserPassword(payload.username, payload.password, newPassword);
  }

  @Mutation(() => AuthenticatedUser)
  async renewToken(){
    return this.authService.renewJWT();
  }
  @Mutation(() => AuthenticatedUser)
  async userLogout(){
    return this.authService.logout();
  }

}