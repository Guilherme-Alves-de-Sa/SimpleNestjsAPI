import { FilterableField, KeySet,  QueryOptions, Relation } from '@nestjs-query/query-graphql';
import { ObjectType, ID, GraphQLISODateTime,  Field, registerEnumType } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/shared/guards/gql.guard';

@ObjectType('User')
@KeySet(['id'])
@QueryOptions({ enableTotalCount: true })
@Relation('createdBy', () => UserDTO, {guards: [GqlAuthGuard], nullable: true})
@Relation('updatedBy', () => UserDTO, {guards: [GqlAuthGuard], nullable: true})
export class UserDTO {
  // common fields
  @FilterableField(() => ID)
  id!: string;
  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  createdAt!: Date;
  @FilterableField(() => GraphQLISODateTime, { nullable: true }) 
  updatedAt!: Date;
  @FilterableField({ nullable: true })
  createdBy?: string;
  @FilterableField({ nullable: true })
  updatedBy?: string;

  // unique fields
  @FilterableField(() => String, { nullable: false })
  username: string
  @FilterableField({ nullable: true })
  firstname!: string;
  @FilterableField({ nullable: true })
  lastname?: string
  @FilterableField()
  email!: string
  @FilterableField(() => String, { nullable: true })
  name: string
  @FilterableField(() => Boolean, { nullable: true })
  status: boolean
  
  @Field({ nullable: true })
  avatar?: string
}