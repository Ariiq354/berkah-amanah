import { RegisterContainer } from "#/feature/auth/RegisterContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterContainer,
});
