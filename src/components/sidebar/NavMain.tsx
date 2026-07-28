import { Link } from "@tanstack/react-router";
import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "#/components/ui/accordion";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "#/components/ui/sidebar";

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  url?: string;
  icon?: LucideIcon;
  items?: NavItem[];
}

export function NavMain({ groups }: { groups: NavGroup[] }) {
  return (
    <>
      {groups.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

          <SidebarMenu>
            <Accordion unstyled className="w-full">
              {group.items.map((item) => (
                <NavMenuItem key={item.title} item={item} />
              ))}
            </Accordion>
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}

function NavMenuItem({ item }: { item: NavItem }) {
  const hasSubItems = item.items && item.items.length > 0;

  if (hasSubItems) {
    return (
      <AccordionItem value={item.title} unstyled className="group w-full">
        <SidebarMenuItem>
          <AccordionTrigger
            unstyled
            render={
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-open:rotate-90" />
              </SidebarMenuButton>
            }
          />

          <AccordionContent
            unstyled
            className="data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden"
          >
            <div className="h-(--accordion-panel-height) transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <NavMenuSubItem key={subItem.title} item={subItem} />
                ))}
              </SidebarMenuSub>
            </div>
          </AccordionContent>
        </SidebarMenuItem>
      </AccordionItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton render={<Link to={item.url} />} tooltip={item.title}>
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function NavMenuSubItem({ item }: { item: NavItem }) {
  const hasSubItems = item.items && item.items.length > 0;

  if (hasSubItems) {
    return (
      <Accordion unstyled className="w-full">
        <AccordionItem
          value={item.title}
          unstyled
          className="group/submenu w-full"
        >
          <SidebarMenuSubItem>
            <AccordionTrigger
              unstyled
              render={
                <SidebarMenuSubButton
                  render={<button type="button" />}
                  className="flex w-full items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </div>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-open/submenu:rotate-90" />
                </SidebarMenuSubButton>
              }
            />

            <AccordionContent
              unstyled
              className="data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden"
            >
              <div className="h-(--accordion-panel-height) transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <NavMenuSubItem key={subItem.title} item={subItem} />
                  ))}
                </SidebarMenuSub>
              </div>
            </AccordionContent>
          </SidebarMenuSubItem>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton render={<Link to={item.url} />}>
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
