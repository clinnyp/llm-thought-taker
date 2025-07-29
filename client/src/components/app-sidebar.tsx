"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { SearchForm } from "./search-form";
import { Brain } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetMessages } from "@/store/features/messages/messagesSlice";
import { NavUser } from "./nav-user";

export function AppSidebar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleNewThought = () => {
    dispatch(resetMessages());
    router.push("/");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Brain />
                <span className="text-base font-semibold">Thought-Taker.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Button onClick={handleNewThought}>New Thought</Button>
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
