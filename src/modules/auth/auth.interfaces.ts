import { UserEntity } from "../user/user.entity";

export type UserContext = {
  req: RequestContext
};

export type RequestContext = {
  [x: string]: any,
  user: UserEntity
}