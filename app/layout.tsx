import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const interHeading = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "admin-agent-GUI",
  description:
    "Graphical interface between human admins and agentic AI for operating businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable, interHeading.variable)}
    >
      <body className={cn(geistMono.variable, "min-h-screen antialiased")}>
        {children}
      </body>
    </html>
  );
}
