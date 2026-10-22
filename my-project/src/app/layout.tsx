import type { Metadata } from "next";
import "./globals.css";
import SiteShell from "../components/site-shell";

export const metadata: Metadata = {
  title: "Dive-in | Votre carnet de plongée en ligne",
  description: "Enregistrez vos plongées, retrouvez vos spots et gardez le souvenir de chaque poisson croisé avec Dive-in.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
