import { createFileRoute } from "@tanstack/react-router";

import { DashboardContainer } from "#/feature/dashboard/components/DashboardContainer";

export const Route = createFileRoute("/dashboard/")({
  staticData: {
    breadcrumb: [
      {
        title: "Dashboard",
      },
    ],
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <DashboardContainer />;
}
