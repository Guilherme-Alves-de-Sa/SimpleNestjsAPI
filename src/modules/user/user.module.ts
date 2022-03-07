import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { Module } from '@nestjs/common';
import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { UserInputDTO } from './dto/user-input.dto';
// import { UserUpdateDTO } from './dto/user-update.dto';
import { UserDTO } from './dto/user.dto';
// import { UserAssembler } from './User.assembler';
import { UserEntity, UserEntitySchema } from './user.entity';
// import { UserResolver } from './user.resolver';
import { GqlAuthGuard } from '../../shared/guards/gql.guard';
import { UserAuthService } from './user.service';
import { UserUpdateDTO } from './dto/user-update.dto';

const guards = [GqlAuthGuard];

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            // import the NestjsQueryMongooseModule to register the entity with mongoose
            // and provide a QueryService
            imports: [
                NestjsQueryMongooseModule.forFeature([
                    { document: UserEntity, name: UserEntity.name, schema: UserEntitySchema },
                ]),
            ],
            // describe the resolvers you want to expose
            resolvers: [
                {
                    DTOClass: UserDTO,
                    EntityClass: UserEntity,
                    CreateDTOClass: UserInputDTO,
                    UpdateDTOClass: UserUpdateDTO,
                    enableAggregate: true,
                    guards: guards,
                }],
        }),
    ],
    // providers: [UserAuthService],
    // exports: [UserAuthService]
})
export class UserModule { }