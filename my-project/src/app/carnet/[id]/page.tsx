"use client";
import Link from "next/link";
import { Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { supprimerPlongee } from "../../../lib/storage";
import { useDonnees, dateFr } from "../../../lib/use-donnees";
export default function Page() { return <Suspense fallback={<main className="inner-page container">Chargement…</main>}><PlongeeDetail /></Suspense>; }
function PlongeeDetail() {
  const { id } = useParams<{ id: string }>(); const router = useRouter(); const data = useDonnees();
  if (!data) return <main className="inner-page container">Chargement…</main>;
  const dive = data.plongees.find((p) => p.id === id);
  if (!dive) return <main className="inner-page container"><h1>Plongée introuvable</h1><Link className="inline-link" href="/carnet">Retour au carnet</Link></main>;
  const spot = data.spots.find((s) => s.id === dive.spotId);
  function remove() { if (window.confirm("Supprimer cette plongée définitivement ?")) { supprimerPlongee(id); router.push("/carnet"); } }
  return <main className="inner-page container"><Link className="back-link" href="/carnet">← Retour au carnet</Link><div className="page-top"><div><span className="eyebrow dark-eyebrow">{dateFr(dive.date)}</span><h1>{spot?.nom ?? "Spot inconnu"}</h1><p>{spot ? <Link className="inline-link" href={`/spots/${spot.id}`}>{spot.region}, {spot.pays} →</Link> : "Spot non disponible"}</p></div><div className="page-actions"><Link href={`/carnet/${id}/modifier`} className="button button-primary">Modifier</Link><button type="button" className="button button-danger" onClick={remove}>Supprimer</button></div></div><div className="detail-grid"><section className="panel"><h2>Votre plongée</h2><dl className="detail-list"><div><dt>Date</dt><dd>{dateFr(dive.date)}</dd></div><div><dt>Profondeur max</dt><dd>{dive.profondeurMax} m</dd></div><div><dt>Durée</dt><dd>{dive.duree} min</dd></div><div><dt>Température</dt><dd>{dive.temperature == null ? "Non renseignée" : `${dive.temperature} °C`}</dd></div><div><dt>Visibilité</dt><dd>{dive.visibilite == null ? "Non renseignée" : `${dive.visibilite} m`}</dd></div><div><dt>Courant</dt><dd className="capitalize">{dive.courant}</dd></div><div><dt>Météo</dt><dd>{dive.meteo || "Non renseignée"}</dd></div></dl></section><div className="detail-side"><section className="panel"><h2>Poissons observés</h2><div className="pill-list">{dive.poissonIds.length ? dive.poissonIds.map((pid) => <span className="pill" key={pid}>{data.poissons.find((p) => p.id === pid)?.nomCommun ?? "Espèce inconnue"}</span>) : <p>Aucun poisson renseigné.</p>}</div></section><section className="panel"><h2>Équipement utilisé</h2><div className="pill-list">{dive.equipementIds.length ? dive.equipementIds.map((eid) => <span className="pill" key={eid}>{data.equipements.find((e) => e.id === eid)?.nom ?? "Équipement inconnu"}</span>) : <p>Aucun équipement renseigné.</p>}</div></section></div></div><section className="panel notes-panel"><h2>Notes de plongée</h2><p>{dive.notes || "Aucune note pour cette plongée."}</p></section></main>;
}
