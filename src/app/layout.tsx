import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RappelConso+",
  description:
    "Surveille les produits que vous avez achetés et vous prévient quand l'un d'eux est rappelé.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RappelConso+",
  },
};

export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${geist.variable} h-full`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="h-full bg-gray-50 font-sans antialiased">
        <div className="flex flex-col h-full max-w-lg mx-auto bg-white shadow-sm">
          <main className="flex-1 overflow-y-auto pb-16">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
