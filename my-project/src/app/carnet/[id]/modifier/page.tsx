"use client";
import Link from "next/link";
import { Suspense } from "react";
import { useParams } from "next/navigation";
import PlongeeForm from "../../../../components/plongee-form";
import { useDonnees } from "../../../../lib/use-donnees";
export default function Page() { return <Suspense fallback={<main className="inner-page container">Chargement…</main>}><ModifierPlongeePage /></Suspense>; }
function ModifierPlongeePage() { const { id } = useParams<{ id: string }>(); const data = useDonnees(); const dive = data?.plongees.find((p) => p.id === id); return <main className="inner-page container"><Link className="back-link" href={`/carnet/${id}`}>← Retour à la plongée</Link>{!data ? <p>Chargement…</p> : !dive ? <p>Plongée introuvable. <Link className="inline-link" href="/carnet">Retour au carnet</Link></p> : <><div className="page-top"><div><span className="eyebrow dark-eyebrow">VOTRE CARNET</span><h1>Modifier la <em>plongée</em></h1><p>Mettez à jour les détails de votre immersion.</p></div></div><PlongeeForm key={id} initial={dive} /></>}</main>; }
