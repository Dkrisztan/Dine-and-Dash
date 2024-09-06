import * as dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

export const BACKEND_PORT = env.get('BACKEND_PORT').default(3001).asPortNumber();
export const BACKEND_URL = env.get('BACKEND_URL').required().asString();
