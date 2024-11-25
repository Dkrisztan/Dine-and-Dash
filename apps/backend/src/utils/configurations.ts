import * as dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

export const BACKEND_PORT = env.get('BACKEND_PORT').default(3001).asPortNumber();
export const BACKEND_URL = env.get('BACKEND_URL').required().asString();
export const GOOGLE_CLIENT_ID = env.get('GOOGLE_CLIENT_ID').required().asString();
export const GOOGLE_CLIENT_SECRET = env.get('GOOGLE_CLIENT_SECRET').required().asString();
export const JWT_SECRET = env.get('JWT_SECRET').required().asString();
export const GOOGLE_CALLBACK_URL = env.get('GOOGLE_CALLBACK_URL').required().asString();
export const FRONTEND_URL = env.get('FRONTEND_URL').required().asString();
export const STRIPE_SECRET_KEY = env.get('STRIPE_SECRET_KEY').required().asString();
export const STRIPE_PUB_KEY = env.get('STRIPE_PUB_KEY').required().asString();
export const STRIPE_WEBHOOK = env.get('STRIPE_WEBHOOK').required().asString();
