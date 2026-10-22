"use client";
import Link from "next/link";
import { useState } from "react";
import { BookOpen, Plus, Waves, ArrowRight } from "lucide-react";
import PageHeading from "../../components/page-heading";
import EmptyState from "../../components/empty-state";
import { useDonnees, dateFr } from "../../lib/use-donnees";
export default function CarnetPage() {
  const data = useDonnees(); const [filter, setFilter] = useState("");
  const dives = [...(data?.plongees ?? [])].filter((dive) => !filter || dive.spotId === filter).sort((a,b) => b.date.localeCompare(a.date));
  return <main className="inner-page container"><PageHeading icon={BookOpen} title="Mon carnet de plongée" subtitle="Toutes vos immersions, de la plus récente à la plus ancienne" actions={<Link href="/carnet/nouveau" className="button button-primary"><Plus size={18} /> Nouvelle plongée</Link>} />
    {data ? <><div className="list-toolbar"><h2 className="subheading">Mes immersions <span>{dives.length}</span></h2><label>Filtrer par spot <select value={filter} onChange={(e) => setFilter(e.target.value)}><option value="">Tous les spots</option>{data.spots.map((spot) => <option key={spot.id} value={spot.id}>{spot.nom}</option>)}</select></label></div><div className="entry-list">{dives.map((dive) => { const spot = data.spots.find((s) => s.id === dive.spotId); return <Link className="entry-card" href={`/carnet/${dive.id}`} key={dive.id}><span className="entry-symbol"><Waves size={24} /></span><span className="entry-info"><strong>{spot?.nom ?? "Spot inconnu"}</strong><small>{spot?.pays ?? ""} · {dateFr(dive.date)}</small></span><span className="entry-numbers"><span>{dive.profondeurMax} m <small>profondeur</small></span><span>{dive.duree} min <small>durée</small></span></span><ArrowRight className="entry-arrow" size={20} /></Link>; })}</div>{dives.length === 0 && <EmptyState message={filter ? "Aucune plongée sur ce spot… essayez un autre lieu !" : "Aucune plongée pour l'instant… le grand bleu vous attend !"} href="/carnet/nouveau" action="Ajouter une plongée" />}</> : <p>Chargement du carnet…</p>}
  </main>;
}
