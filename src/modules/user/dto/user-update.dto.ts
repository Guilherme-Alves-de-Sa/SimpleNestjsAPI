import { Field, ID, InputType } from '@nestjs/graphql';
import {
  BeforeUpdateMany,
  BeforeUpdateOne,
  UpdateManyInputType,
  UpdateOneInputType,
} from '@nestjs-query/query-graphql';
import { UserDTO } from './user.dto';

@InputType('UserUpdate')
@BeforeUpdateOne((input: UpdateOneInputType<UserDTO>, context: any) => {
  input.update.updatedBy = context.req.user.id;
  return input;
})
@BeforeUpdateMany((input: UpdateManyInputType<UserDTO, UserDTO>, context: any) => {
  input.update.updatedBy = context.req.user.id;
  return input;
})

export class UserUpdateDTO {
  @Field({ nullable: true })
  firstName?: string
  @Field({ nullable: true })
  lastName?: string
  @Field({ nullable: true })
  email?: string
  @Field({ nullable: true })
  phoneNumber?: string
  @Field({ nullable: true})
  profilePicture?: string
}






