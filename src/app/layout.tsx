import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Footer } from "@/components/layout/Footer";
import { rosieBrown } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Fianka",
  description: "A modern, scalable Next.js application with TanStack Router and Zustand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${rosieBrown.variable} antialiased`}
      >
        <LanguageProvider>
          <StoreProvider>
            {children}
            <Footer />
          </StoreProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
