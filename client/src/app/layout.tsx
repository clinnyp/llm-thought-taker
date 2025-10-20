import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Brain } from "lucide-react";

export const metadata: Metadata = {
  title: "Thought-Taker",
  description: "LLM generated thoughts taker",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
