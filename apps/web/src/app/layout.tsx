import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/style/globals.css";
import {Provider} from "@/providers/provider";
import {ReactNode} from "react";
import {cn} from "@repo/ui/lib";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manage your projects",
  description: "Make your projects management easier",
};

export default async function RootLayout({
  children,
  public: publicApp
}: Readonly<{
  children: ReactNode
  public: ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(geistSans.variable, geistMono.variable, 'antialiased')}
      >
      <Provider>
        {children}
        {publicApp}
      </Provider>
      </body>
    </html>
  );
}
