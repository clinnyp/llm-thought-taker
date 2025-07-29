"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useNotes, useDeleteNote } from "@/hooks/use-notes";

export function NavMain({
  ...props
}: {} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const { data: allNotes = [], isLoading, error } = useNotes();
  const deleteNoteMutation = useDeleteNote();

  const handleDeleteNote = async (noteId: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling

    try {
      await deleteNoteMutation.mutateAsync(noteId);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  if (isLoading) {
    return (
      <SidebarGroup {...props}>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem className="pb-1">
              <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4"></div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  if (error) {
    return (
      <SidebarGroup {...props}>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem className="pb-1">
              <div className="text-red-500 text-sm">Failed to load notes</div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {allNotes.map((item) => (
            <SidebarMenuItem className="pb-1" key={item.id}>
              <div className="flex items-center justify-between group/item">
                <SidebarMenuButton asChild className="flex-1 w-full">
                  <div className="flex justify-between">
                    <Link href={`/chat/note/${item.id}`}>
                      <div className="truncate">
                        <span>{item.title}</span>
                      </div>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover/item:opacity-100 hover:opacity-80 hover:bg-red-50 hover:text-red-600 transition-all ml-2"
                      onClick={(e) => handleDeleteNote(item.id, e)}
                      disabled={deleteNoteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </SidebarMenuButton>
              </div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
