import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { betterAuth } from "better-auth";
import { admin as adminPlugins, username } from "better-auth/plugins";

import { db } from "../database";
import { relations } from "../database/relations";
import * as schema from "../database/schema/auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      relations,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 7,
  },
  user: {
    additionalFields: {
      daerahId: {
        type: "number",
        required: true,
        fieldName: "daerahId",
      },
      desaId: {
        type: "number",
        required: false,
        fieldName: "desaId",
      },
      kelompokId: {
        type: "number",
        required: false,
        fieldName: "kelompokId",
      },
    },
  },
  advanced: {
    database: {
      generateId: false,
      joins: true,
    },
  },
  plugins: [
    username(),
    adminPlugins({
      defaultRole: "daerah",
    }),
  ],
});

export type UserWithId = Omit<typeof auth.$Infer.Session.user, "id"> & {
  id: number;
};
