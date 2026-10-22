"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ajouterPlongee, modifierPlongee } from "../lib/storage";
import { useDonnees } from "../lib/use-donnees";
import type { Plongee } from "../lib/types";

const empty: Plongee = { id: "", date: "", spotId: "", profondeurMax: 0, duree: 0, temperature: null, visibilite: null, courant: "faible", meteo: "", poissonIds: [], equipementIds: [], notes: "" };
export default function PlongeeForm({ initial }: { initial?: Plongee }) {
  const router = useRouter(); const data = useDonnees();
  const [form, setForm] = useState<Plongee>(initial ?? empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  function change<K extends keyof Plongee>(key: K, value: Plongee[K]) { setForm((prev) => ({ ...prev, [key]: value })); setErrors((prev) => ({ ...prev, [key]: "" })); }
  function toggle(key: "poissonIds" | "equipementIds", id: string) { change(key, form[key].includes(id) ? form[key].filter((value) => value !== id) : [...form[key], id]); }
  function save(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.date) next.date = "Choisissez une date.";
    if (!form.spotId) next.spotId = "Choisissez un spot.";
    if (!Number.isFinite(form.profondeurMax) || form.profondeurMax <= 0) next.profondeurMax = "Indiquez une profondeur supérieure à 0.";
    if (!Number.isFinite(form.duree) || form.duree <= 0) next.duree = "Indiquez une durée supérieure à 0.";
    if (form.temperature !== null && (!Number.isFinite(form.temperature) || form.temperature < -5 || form.temperature > 45)) next.temperature = "Indiquez une température entre -5 et 45 °C.";
    if (form.visibilite !== null && (!Number.isFinite(form.visibilite) || form.visibilite < 0)) next.visibilite = "Indiquez une visibilité positive.";
    if (Object.keys(next).length) { setErrors(next); return; }
    if (initial) modifierPlongee(form); else ajouterPlongee({ ...form, id: crypto.randomUUID() });
    setMessage("Plongée enregistrée ! Retour au carnet…");
    setTimeout(() => router.push("/carnet"), 900);
  }
  if (!data) return <p>Chargement du formulaire…</p>;
  return <form className="panel dive-form" onSubmit={save} noValidate>
    <div className="form-grid"><label>Date *<input type="date" value={form.date} onChange={(e) => change("date", e.target.value)} aria-invalid={!!errors.date} />{errors.date && <small className="field-error">{errors.date}</small>}</label><label>Spot *<select value={form.spotId} onChange={(e) => change("spotId", e.target.value)} aria-invalid={!!errors.spotId}><option value="">Choisir un spot</option>{data.spots.map((spot) => <option value={spot.id} key={spot.id}>{spot.nom} — {spot.pays}</option>)}</select>{errors.spotId && <small className="field-error">{errors.spotId}</small>}<small>Un spot manque ? <Link className="inline-link" href="/spots">Ajoutez-le ici</Link>.</small></label><label>Profondeur max (m) *<input type="number" min="0.1" step="0.1" value={form.profondeurMax || ""} onChange={(e) => change("profondeurMax", Number(e.target.value))} aria-invalid={!!errors.profondeurMax} />{errors.profondeurMax && <small className="field-error">{errors.profondeurMax}</small>}</label><label>Durée (min) *<input type="number" min="1" step="1" value={form.duree || ""} onChange={(e) => change("duree", Number(e.target.value))} aria-invalid={!!errors.duree} />{errors.duree && <small className="field-error">{errors.duree}</small>}</label></div>
    <h2>Les conditions</h2><div className="form-grid"><label>Température (°C)<input type="number" step="0.1" value={form.temperature ?? ""} onChange={(e) => change("temperature", e.target.value === "" ? null : Number(e.target.value))} aria-invalid={!!errors.temperature} />{errors.temperature && <small className="field-error">{errors.temperature}</small>}</label><label>Visibilité (m)<input type="number" min="0" step="0.1" value={form.visibilite ?? ""} onChange={(e) => change("visibilite", e.target.value === "" ? null : Number(e.target.value))} aria-invalid={!!errors.visibilite} />{errors.visibilite && <small className="field-error">{errors.visibilite}</small>}</label><label>Courant<select value={form.courant} onChange={(e) => change("courant", e.target.value as Plongee["courant"])}><option value="faible">Faible</option><option value="moyen">Moyen</option><option value="fort">Fort</option></select></label><label>Météo<input value={form.meteo} onChange={(e) => change("meteo", e.target.value)} placeholder="Ensoleillé, nuageux…" /></label></div>
    <h2>Poissons observés</h2><div className="check-grid">{data.poissons.map((fish) => <label className="check-item" key={fish.id}><input type="checkbox" checked={form.poissonIds.includes(fish.id)} onChange={() => toggle("poissonIds", fish.id)} />{fish.nomCommun}</label>)}</div><h2>Équipement utilisé</h2><div className="check-grid">{data.equipements.map((item) => <label className="check-item" key={item.id}><input type="checkbox" checked={form.equipementIds.includes(item.id)} onChange={() => toggle("equipementIds", item.id)} />{item.nom}</label>)}</div>
    <label>Notes<textarea rows={5} value={form.notes} onChange={(e) => change("notes", e.target.value)} placeholder="Racontez votre plongée…" /></label><div className="form-actions"><button className="button button-primary" type="submit">{initial ? "Enregistrer les modifications" : "Enregistrer la plongée"}</button><Link className="button button-muted" href="/carnet">Annuler</Link></div>{message && <p className="success-message" role="status">{message}</p>}
  </form>;
}
