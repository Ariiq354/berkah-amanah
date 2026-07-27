import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useMatches,
} from "@tanstack/react-router";
import { Fragment } from "react";

import { AppSidebar } from "#/components/sidebar/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#/components/ui/breadcrumb";
import { Separator } from "#/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "#/components/ui/sidebar";
import { getSession } from "#/lib/auth-function";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const session = await getSession();

    if (!session) {
      throw redirect({ to: "/" });
    }

    return { user: session.user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const matches = useMatches();

  const breadcrumbs = matches.flatMap(
    (match) => match.staticData?.breadcrumb ?? [],
  );
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="my-auto mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((item, index) => {
                  const isLast = index === breadcrumbs.length - 1;

                  return (
                    <Fragment key={item.to ?? item.title}>
                      <BreadcrumbItem className="hidden md:block">
                        {!isLast && item.to ? (
                          <BreadcrumbLink
                            render={<Link to={item.to}>{item.title}</Link>}
                          />
                        ) : (
                          <BreadcrumbPage>{item.title}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {!isLast && (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
