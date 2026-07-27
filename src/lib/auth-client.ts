import { createAuthClient } from "better-auth/client";
import {
  inferAdditionalFields,
  usernameClient,
  adminClient,
} from "better-auth/client/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import type { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [
    usernameClient(),
    adminClient(),
    inferAdditionalFields<typeof auth>(),
    tanstackStartCookies(),
  ],
});
