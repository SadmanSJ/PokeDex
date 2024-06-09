import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/UI/Navbar";
import dynamic from "next/dynamic";
import { inter, kanit } from "./fonts";
const ThemeProvider = dynamic(() => import("@/providers/ThemeProvider"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "PokeDex",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${kanit.variable} flex flex-col grow min-h-scree  items-center justify-start text-black dark:text-white bg-slate-200 dark:bg-gray-700`}
      >
        <ThemeProvider
          defaultTheme="system"
          attribute="class"
          enableSystem
          enableColorScheme
        >
          <Navbar />

          <main className="flex flex-grow w-full h-full container mx-auto transition-all">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
