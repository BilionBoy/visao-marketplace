import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Fontes personalizadas para o Visão Agro
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Visão Agro - Plataforma de Pregão Digital",
  description:
    "Sistema governamental de licitações para o agronegócio brasileiro - Conectando produtores rurais e fornecedores",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/marketplace-favicon.png",
        type: "image/png",
      },
    ],
    apple: "/marketplace-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
