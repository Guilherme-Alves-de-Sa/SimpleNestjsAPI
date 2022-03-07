import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AzureServiceResponse {
  @Field(() => Boolean)
  isSuccessful!: boolean
  @Field(() => Number)
  statusCode!: number
}

@ObjectType()
export class AzureServiceError {
  @Field(() => String)
  message!: string
  @Field(() => String)
  name!: string
}

@ObjectType()
export class AzureResponseObject {
  @Field(() => AzureServiceResponse, { nullable: false })
  response!: AzureServiceResponse 
  @Field(() => Boolean, { nullable: false })
  result!: boolean 
  @Field(() => AzureServiceError, { nullable: true })
  error?: AzureServiceError
}