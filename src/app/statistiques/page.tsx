"use client";
import { BarChart3, BookOpen, MapPin, Fish, Waves, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageHeading from "../../components/page-heading";
import { useDonnees } from "../../lib/use-donnees";
export default function StatistiquesPage() {
  const data = useDonnees();
  const dives = data?.plongees ?? [];
  const stats = [{icon: BookOpen, value: dives.length, label: "Plongées enregistrées"}, {icon: MapPin, value: data?.spots.length ?? 0, label: "Spots explorés"}, {icon: Fish, value: data?.poissons.length ?? 0, label: "Espèces répertoriées"}, {icon: Waves, value: dives.length ? `${Math.max(...dives.map((p) => p.profondeurMax))} m` : "–", label: "Profondeur maximale"}];
  return <main className="inner-page container"><PageHeading icon={BarChart3} title="Mes statistiques" subtitle="Votre parcours de plongeur en chiffres" /><section><h2 className="subheading">Votre aventure en chiffres</h2><div className="stat-page-grid">{stats.map(({icon: Icon, value, label}) => <div className="panel stat-page-card" key={label}><Icon size={26} /><strong>{data ? value : "–"}</strong><span>{label}</span></div>)}</div></section><Link href="/carnet" className="button button-secondary stats-back">Voir mon carnet <ArrowRight size={18}/></Link></main>;
}
