import { Field, InputType, ObjectType, ID, Int } from "@nestjs/graphql";
import { FilterableField } from "@nestjs-query/query-graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

// Tenant Names

@Schema()
export class TenantNameEntity extends Document {
  @Prop({ required: true })
  company!: string;
  @Prop({ required: true })
  code!: string;
  @Prop({ required: true })
  description!: string;
}

@ObjectType()
export class TenantNameDTO {
  @FilterableField(() => String, { nullable: false })
  code!: string
  @Field(() => String, { nullable: false })
  description!: string
  @FilterableField(() => ID, { nullable: false })
  company!: string
}

@InputType()
export class TenantNameInputDTO {
  @Field(() => String, { nullable: false })
  code!: string
  @Field(() => String, { nullable: false })
  description!: string
  @Field(() => ID, { nullable: false })
  company!: string
}


// Description Object

@ObjectType()
export class DescriptionObjectType {
  @Field(() => String, { nullable: false })
  pt: string
  @Field(() => String, { nullable: true })
  en: string
  @Field(() => String, { nullable: true })
  es: string
}

@InputType()
export class DescriptionObjectInputType {
  @Field(() => String, { nullable: false })
  pt: string
  @Field(() => String, { nullable: true })
  en: string
  @Field(() => String, { nullable: true })
  es: string
}

@InputType()
export class IDInputType {
  @Field(() => ID, { nullable: false })
  id!: string
}

@ObjectType()
export class DeletedCountType {
  @Field(() => Int)
  deletedCount!: number
}