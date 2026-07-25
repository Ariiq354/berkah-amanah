import { LoginContainer } from "#/feature/auth/LoginContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/")({
  component: LoginContainer,
});
