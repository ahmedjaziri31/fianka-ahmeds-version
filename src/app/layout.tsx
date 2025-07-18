import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { Footer } from "@/components/layout/Footer";
import { rosieBrown } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Fianka - Scalable Next.js App",
  description: "A modern, scalable Next.js application with TanStack Router and Zustand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rosieBrown.variable} antialiased`}
      >
        <StoreProvider>
        {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
