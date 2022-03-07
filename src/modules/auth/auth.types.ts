import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserDTO } from '../user/dto/user.dto';


@ObjectType()
export class AuthenticatedUser {

    // passport local
    @Field(() => String)
    access_token: string
    
    @Field(() => UserDTO)
    user: UserDTO
}

@InputType()
export class LoginUserInput {
    @Field(() => String)
    username: string;
    @Field(() => String)
    password: string;
}