import { betterAuth } from "better-auth";
import {
  inferAdditionalFields,
  usernameClient,
  adminClient,
} from "better-auth/client/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import type { auth } from "#/server/utils/auth";

export const authClient = betterAuth({
  plugins: [
    usernameClient(),
    adminClient(),
    inferAdditionalFields<typeof auth>(),
    tanstackStartCookies(),
  ],
});
