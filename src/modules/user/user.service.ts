import { QueryService } from '@nestjs-query/core';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseQueryService } from '@nestjs-query/query-mongoose';
import { UserEntity } from './user.entity';
import { Model } from 'mongoose';
import { UserDTO } from './dto/user.dto';
import { plainToClass } from 'class-transformer';
import { Schema as MongooseSchema } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

@QueryService(UserEntity)
export class UserAuthService extends MongooseQueryService<UserEntity> {
  constructor(@InjectModel(UserEntity.name) model: Model<UserEntity>) {
    super(model);
  }

  async getUserWithPassword(username: string): Promise<{ userDto: UserDTO, password: string }> {
    const user = await this.query({filter: { email: { eq: username}}});
    if(!user || user.length !== 1) { throw new NotFoundException("User '"+username+"' not found."); }
    return { userDto: plainToClass(UserDTO, user[0].toObject({ virtuals: true })), password: user[0].password };
  }

  async getByIdForAuth(userId: string): Promise<UserDTO> {
    const user = await this.getById(userId);
    delete user.password
    if (user) {
      return plainToClass(UserDTO, user.toObject({ virtuals: true }));
    }
    return null;
  }

  async setPassword(id: string | MongooseSchema.Types.ObjectId, password: string): Promise<UserDTO> {
    let _id: MongooseSchema.Types.ObjectId;
    if (typeof id === 'string') {
      _id = new MongooseSchema.Types.ObjectId(id);
    }
    else {
      _id = id;
    }
    const userEntity =await this.Model.findByIdAndUpdate(_id, { password: password }, { useFindAndModify: false, new: true }).exec();
    return plainToClass(UserDTO, userEntity.toObject({ virtuals: true }));
  }

  async getUserWhiteList(username: string): Promise<UserDTO> {
    const user = await this.query({filter: { email: { eq: username}}});
    if(!user || user.length !== 1) { throw new NotFoundException("User '"+username+"' not found."); }
    return plainToClass(UserDTO, user[0].toObject({ virtuals: true }));
  }
}