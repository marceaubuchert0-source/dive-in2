import type { Metadata } from "next";
import "./globals.css";
import SiteShell from "../components/site-shell";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });

export const metadata: Metadata = {
  title: "Dive-in | Votre carnet de plongée en ligne",
  description: "Enregistrez vos plongées, retrouvez vos spots et gardez le souvenir de chaque poisson croisé avec Dive-in.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
