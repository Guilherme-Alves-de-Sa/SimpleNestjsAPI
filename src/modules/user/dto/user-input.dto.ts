import { Field, InputType, ID } from '@nestjs/graphql';
import { IsOptional, IsNotEmpty, IsEmail } from 'class-validator';
import {
  BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
} from '@nestjs-query/query-graphql';
import { UserDTO } from './user.dto';
import { AuthService } from 'src/modules/auth/auth.service';


@InputType('UserInput')
@BeforeCreateOne(async (input: CreateOneInputType<UserDTO>, context: any) => {
  input.input.createdBy = context.req.user.id;
  input.input.username = input.input.email
  if (input.input["password"]){
    input.input["password"] =await AuthService.hashPassword(input.input["password"])
  }
  return input;
})
@BeforeCreateMany(async (input: CreateManyInputType<UserDTO>, context: any) => {
  const createdBy = context.req.user.id;
  input.input = input.input.map((c) => ({ ...c, createdBy, username: c.email }));
  return input;
})

export class UserInputDTO {

  @Field() 
  @IsNotEmpty()
  firstname: string

  @Field()
  @IsNotEmpty()
  lastname?: string

  @Field()
  @IsNotEmpty()
  name!: string
  
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email!: string
  
  @Field()
  @IsNotEmpty()
  password!: string
  
  @Field(() => Boolean)
  @IsOptional()
  status?: boolean
  
  @Field({ nullable: true })
  @IsOptional()
  avatar?: string
  
  @Field(() => ID, { nullable: false })
  @IsOptional()
  company?: string

  @Field(() => ID, { nullable: true })
  @IsOptional()
  fabricator?: string
}


 