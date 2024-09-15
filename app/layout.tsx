import type { Metadata } from "next";
import { inter } from "@/lib/font";
import "./globals.css";
import Header from "@/components/layout/header";
import ReactQueryProvider from "@/components/react-query-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Gatherly",
  description: "Event management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray1 text-gray12`}>
        <ReactQueryProvider>
          <Header />
          {children}
        </ReactQueryProvider>
        <Toaster/>
      </body>
    </html>
  );
}
