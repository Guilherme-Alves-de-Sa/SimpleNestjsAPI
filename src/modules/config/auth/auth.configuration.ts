import { registerAs } from '@nestjs/config';
export default registerAs('auth', () => ({
  jwt_secret_key: process.env.AUTH_JWTSECRET,
  jwt_expires_in: process.env.AUTH_JWTEXPIRES,
  self_service: process.env.AUTH_SELFSERVICE,
}));