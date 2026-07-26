import { createFileRoute } from "@tanstack/react-router";

import { RegisterContainer } from "#/feature/auth/RegisterContainer";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterContainer,
});
