import { z } from 'zod';

const configurationSchema = z.object({
  PORT: z.coerce.number().default(8080),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z.string().url(),
  CORS_ORIGINS: z.string().url(),
  CORS_CREDENTIALS: z.coerce.boolean().default(true),
});

export interface Configuration {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  corsOrigins: string[];
  corsCredentials: boolean;
}

const parseCorsOrigins = (corsOrigins: string): string[] => {
  if (corsOrigins.includes(',')) {
    return corsOrigins.split(',').map((origin) => origin.trim());
  }

  return [corsOrigins.trim()];
};

export const configuration = (): Configuration => {
  const env = configurationSchema.parse(process.env);

  return {
    port: env.PORT,
    nodeEnv: env.NODE_ENV,
    databaseUrl: env.DATABASE_URL,
    corsOrigins: parseCorsOrigins(env.CORS_ORIGINS),
    corsCredentials: env.CORS_CREDENTIALS,
  };
};
