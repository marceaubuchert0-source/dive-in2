"use client";
import { useEffect, useState } from "react";
import { lireDonnees } from "./storage";
import type { Donnees } from "./types";

export function useDonnees() {
  const [donnees, setDonnees] = useState<Donnees | null>(null);
  useEffect(() => {
    const refresh = () => setDonnees(lireDonnees());
    refresh();
    window.addEventListener("dive-in-update", refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener("dive-in-update", refresh); window.removeEventListener("storage", refresh); };
  }, []);
  return donnees;
}
export function dateFr(date: string) { return new Date(`${date}T12:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }); }
