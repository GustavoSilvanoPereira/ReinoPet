import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reino Pet | O melhor E-commerce para o seu Pet",
  description: "Encontre as melhores rações, acessórios exclusivos e agende banho e tosa para cães e gatos. O shopping completo para o seu melhor amigo com frete grátis!",
  keywords: ["pet shop", "ração", "acessórios pet", "banho e tosa", "cachorro", "gato", "e-commerce pet"],
  openGraph: {
    title: "Reino Pet | Tudo para o seu Melhor Amigo",
    description: "Rações premium, brinquedos, coleiras e serviço profissional de banho e tosa. Entrega rápida e segura.",
    type: "website",
    locale: "pt_BR",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#fcfbf9] text-slate-800 dark:bg-slate-950 dark:text-slate-200">
        <CartProvider>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
