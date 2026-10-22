"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Fish, Ruler, Waves, Tags, MapPin, CalendarDays, ShieldCheck } from "lucide-react";
import SpeciesArt from "../../../components/illustrations/species-art";
import EmptyState from "../../../components/empty-state";
import { useDonnees, dateFr } from "../../../lib/use-donnees";

export default function Page() { return <Suspense fallback={<main className="inner-page container">Chargement…</main>}><FishDetail /></Suspense>; }
function FishDetail() {
  const { id } = useParams<{ id: string }>();
  const data = useDonnees();
  if (!data) return <main className="inner-page container">Chargement…</main>;
  const fish = data.poissons.find((item) => item.id === id);
  if (!fish) return <main className="inner-page container"><h1>Espèce introuvable</h1><Link className="button button-secondary" href="/poissons"><ArrowLeft size={18} /> Retour aux poissons</Link></main>;
  const observations = data.plongees.filter((dive) => dive.poissonIds.includes(id)).sort((a, b) => b.date.localeCompare(a.date));
  return <main className="inner-page container fish-detail-page">
    <Link className="back-link" href="/poissons"><ArrowLeft size={17} /> Retour aux poissons</Link>
    <div className="fish-banner"><SpeciesArt fish={fish} /></div>
    <div className="fish-detail-heading"><div><span className="page-heading-icon"><Fish size={24} aria-hidden="true" /></span><h1>{fish.nomCommun}</h1><p className="scientific-name"><em>{fish.nomScientifique || "Nom scientifique non renseigné"}</em></p></div>{fish.statut && <span className="badge badge-coral"><ShieldCheck size={15} />{fish.statut}</span>}</div>
    <div className="fish-facts"><div className="panel fish-fact"><Ruler size={24} /><span>Taille</span><strong>{fish.taille || "Non renseignée"}</strong></div><div className="panel fish-fact"><Waves size={24} /><span>Profondeur</span><strong>{fish.profondeurHabituelle || "Non renseignée"}</strong></div><div className="panel fish-fact"><Tags size={24} /><span>Famille</span><strong>{fish.famille || "Non renseignée"}</strong></div></div>
    <div className="fish-copy-grid"><section className="panel"><h2>Habitat</h2><p>{fish.habitat || "Habitat non renseigné pour cette espèce."}</p></section><section className="panel"><h2>Description</h2><p>{fish.description || "Une rencontre sous-marine à raconter lors de votre prochaine plongée."}</p></section></div>
    <section className="fish-observations"><h2 className="subheading">Mes observations <span>{observations.length}</span></h2>{observations.length ? <div className="entry-list">{observations.map((dive) => { const spot = data.spots.find((s) => s.id === dive.spotId); return <div className="entry-card" key={dive.id}><span className="entry-symbol"><CalendarDays size={24} /></span><span className="entry-info"><strong><Link href={`/carnet/${dive.id}`} className="inline-link">{dateFr(dive.date)} <ArrowRight size={16} aria-hidden="true" /></Link></strong><small><MapPin size={14} /> {spot ? <Link href={`/spots/${spot.id}`} className="inline-link">{spot.nom} · {spot.pays}</Link> : "Spot inconnu"}</small></span></div>; })}</div> : <EmptyState message="Pas encore d'observation pour cette espèce… le grand bleu vous attend !" href="/carnet/nouveau" action="Ajouter une plongée" />}</section>
  </main>;
}
