import { createFileRoute } from "@tanstack/react-router";

import { AkunContainer } from "#/feature/akun/components/AkunContainer";
import { getAkunListQueryOptions } from "#/feature/akun/queries/akun-query";

export const Route = createFileRoute("/dashboard/akun")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getAkunListQueryOptions({ page: 1, limit: 10 }));
  },
  staticData: {
    breadcrumb: [
      {
        title: "Dashboard",
        to: "/dashboard",
      },
      {
        title: "Daftar Akun",
      },
    ],
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <AkunContainer />;
}
