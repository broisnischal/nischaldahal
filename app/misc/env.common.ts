import { z } from "zod";
import { camelKeys } from "string-ts";

// Define the environment schema using ArkType.

// const envArkSchema = type({
//   MODE: ['"development"|"test"|"production"', "=", "development"],
// });

// // Create the environment parser for ArkType.

// const getArkEnv = makeTypedEnvironment((d) => envArkSchema.assert(d));

const publicEnvSchema = z.object({
  GOOGLE_MAPS_API_KEY: z.string(),
  STRIPE_PUBLIC_KEY: z.string(),
});

const privateEnvSchema = z.object({
  STRIPE_SECRET_KEY: z.string().optional(),
});

function makeTypedEnv<T>(schema: { parse: (data: unknown) => T }) {
  return (args: Record<string, unknown>) => camelKeys(schema.parse(args));
}

export function getPublicEnvExpose() {
  if (typeof window == "undefined") {
    return getPublicEnvFrom(process.env);
  }
}

const getPublicEnvFrom = makeTypedEnv(publicEnvSchema);

function getPrivateEnv() {
  return privateEnvSchema.parse(process.env);
}

const getPrivateEnvFrom = makeTypedEnv(privateEnvSchema);

export type PublicEnv = ReturnType<typeof getPublicEnvFrom>;
export type PrivateEnv = ReturnType<typeof getPrivateEnvFrom>;

function getPublicEnv() {
  if (typeof window == "undefined") {
    return getPublicEnvFrom(process.env);
  }

  if (!window.PUBLIC_ENV) {
    throw new Error("PUBLIC_ENV is not defined, Not exposed!");
  }

  return getPublicEnvFrom(window.PUBLIC_ENV);
}

export { publicEnvSchema, makeTypedEnv, getPublicEnv };

declare global {
  namespace NodeJS {
    interface ProcessEnv extends PublicEnv, PrivateEnv {}
  }
}
