import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import "./globals.css";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Thought-Taker",
  description: "LLM generated thoughts taker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <SidebarProvider>
        <AppSidebar />
        <html>
          <body>{children}</body>
        </html>
      </SidebarProvider>
    </StoreProvider>
  );
}
