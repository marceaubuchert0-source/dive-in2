"use client";
import Link from "next/link";
import { useState } from "react";
import { useDonnees, dateFr } from "../../lib/use-donnees";
export default function CarnetPage() {
  const data = useDonnees(); const [filter, setFilter] = useState("");
  const dives = [...(data?.plongees ?? [])].filter((dive) => !filter || dive.spotId === filter).sort((a,b) => b.date.localeCompare(a.date));
  return <main className="inner-page container"><div className="page-top"><div><span className="eyebrow dark-eyebrow">VOTRE HISTOIRE SOUS-MARINE</span><h1>Mon <em>carnet</em></h1><p>Retrouvez chaque immersion, chaque souvenir et chaque découverte.</p></div><Link href="/carnet/nouveau" className="button button-primary">+ Nouvelle plongée</Link></div>
    {data ? <><div className="list-toolbar"><strong>{dives.length} plongée{dives.length > 1 ? "s" : ""}</strong><label>Filtrer par spot <select value={filter} onChange={(e) => setFilter(e.target.value)}><option value="">Tous les spots</option>{data.spots.map((spot) => <option key={spot.id} value={spot.id}>{spot.nom}</option>)}</select></label></div><div className="entry-list">{dives.map((dive) => { const spot = data.spots.find((s) => s.id === dive.spotId); return <Link className="entry-card" href={`/carnet/${dive.id}`} key={dive.id}><span className="entry-symbol">≋</span><span className="entry-info"><strong>{spot?.nom ?? "Spot inconnu"}</strong><small>{spot?.pays ?? ""} · {dateFr(dive.date)}</small></span><span className="entry-numbers"><span>{dive.profondeurMax} m <small>profondeur</small></span><span>{dive.duree} min <small>durée</small></span></span><span className="entry-arrow">→</span></Link>; })}</div>{dives.length === 0 && <div className="empty-state">{filter ? "Aucune plongée sur ce spot." : "Votre carnet est vide. Prêt à enregistrer votre première plongée ?"}<br/><Link className="inline-link" href="/carnet/nouveau">Ajouter une plongée →</Link></div>}</> : <p>Chargement du carnet…</p>}
  </main>;
}
