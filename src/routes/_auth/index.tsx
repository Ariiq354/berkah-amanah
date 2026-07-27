import { createFileRoute } from "@tanstack/react-router";

import { LoginContainer } from "#/feature/auth/components/LoginContainer";

export const Route = createFileRoute("/_auth/")({
  component: LoginContainer,
});
