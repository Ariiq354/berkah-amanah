import { createFileRoute } from "@tanstack/react-router";

import { LoginContainer } from "#/feature/auth/LoginContainer";

export const Route = createFileRoute("/_auth/")({
  component: LoginContainer,
});
