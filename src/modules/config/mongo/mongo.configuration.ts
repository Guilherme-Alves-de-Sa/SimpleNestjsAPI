import { registerAs } from '@nestjs/config';
export default registerAs('mongo', () => ({
  connection_string: process.env.APP_ENV === "production" ? process.env.MONGO_CONNSTR : process.env.MONGO_CONNSTR_DEV,
  auth: {
    user: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD
  },
  dbName: process.env.MONGO_DB,
}));