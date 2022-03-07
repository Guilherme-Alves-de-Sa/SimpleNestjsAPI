import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true })
export class UserEntity extends Document {
  // common fields
  @Prop({type: SchemaTypes.ObjectId, ref: 'UserEntity'})
  createdBy?: Types.ObjectId;
  @Prop({type: SchemaTypes.ObjectId, ref: 'UserEntity'})
  updatedBy?: Types.ObjectId;

  // passport fields
  @Prop()
  password!: string;

  // user profile
  @Prop({unique: true})
  username!: string;
  @Prop()
  firstname!: string;
  @Prop()
  lastname!: string;
  @Prop({unique: true})
  email!: string;
  @Prop()
  name?: string;
  @Prop()
  avatar?: string;
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);