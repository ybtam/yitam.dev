import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/style/globals.css";
import {Provider} from "@/providers/provider";
import {ReactNode} from "react"
import {cn} from "@repo/ui/lib"
import {auth} from "@repo/sdk"

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
  public: publicApp,
  protected: protectedApp
}: Readonly<{
  public: ReactNode
  protected: ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="en">
      <body
        className={cn(geistSans.variable, geistMono.variable, 'antialiased')}
      >
      <Provider accessToken={session?.user?.access_token}>
        {
          !session ? publicApp : protectedApp
        }
      </Provider>
      </body>
    </html>
  );
}
