import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Oswald} from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Easy Study",
  description: "Ai study tool",
};

const oswald=Oswald({subsets:['latin']});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={oswald.className}
      >
        {children}
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
