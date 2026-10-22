"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { enregistrerPlongeeAvecAjouts } from "../lib/storage";
import { useDonnees } from "../lib/use-donnees";
import type { Equipement, Plongee, Poisson, Spot } from "../lib/types";
import { Save, X, CircleAlert, Plus } from "lucide-react";

const NEW_SPOT = "__nouveau_spot__";
const empty: Plongee = { id: "", date: "", spotId: "", profondeurMax: 0, duree: 0, temperature: null, visibilite: null, courant: "faible", meteo: "", poissonIds: [], equipementIds: [], notes: "" };
const errorText = (message?: string) => message && <small className="field-error"><CircleAlert size={14} />{message}</small>;

export default function PlongeeForm({ initial }: { initial?: Plongee }) {
  const router = useRouter();
  const data = useDonnees();
  const [form, setForm] = useState<Plongee>(initial ?? empty);
  const [spot, setSpot] = useState({ nom: "", pays: "", region: "", description: "" });
  const [fish, setFish] = useState({ nom: "", description: "" });
  const [equipment, setEquipment] = useState({ nom: "", description: "" });
  const [addFish, setAddFish] = useState(false);
  const [addEquipment, setAddEquipment] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  function change<K extends keyof Plongee>(key: K, value: Plongee[K]) { setForm((prev) => ({ ...prev, [key]: value })); setErrors((prev) => ({ ...prev, [key]: "" })); }
  function clearError(key: string) { setErrors((prev) => ({ ...prev, [key]: "" })); }
  function toggle(key: "poissonIds" | "equipementIds", id: string) { change(key, form[key].includes(id) ? form[key].filter((value) => value !== id) : [...form[key], id]); }

  function save(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.date) next.date = "Choisissez une date.";
    if (!form.spotId) next.spotId = "Choisissez un spot.";
    if (form.spotId === NEW_SPOT && !spot.nom.trim()) next.spotNom = "Nommez le nouveau spot.";
    if (addFish && !fish.nom.trim()) next.fishNom = "Nommez l'espèce observée.";
    if (addEquipment && !equipment.nom.trim()) next.equipmentNom = "Nommez l'équipement utilisé.";
    if (!Number.isFinite(form.profondeurMax) || form.profondeurMax <= 0) next.profondeurMax = "Indiquez une profondeur supérieure à 0.";
    if (!Number.isFinite(form.duree) || form.duree <= 0) next.duree = "Indiquez une durée supérieure à 0.";
    if (form.temperature !== null && (!Number.isFinite(form.temperature) || form.temperature < -5 || form.temperature > 45)) next.temperature = "Indiquez une température entre -5 et 45 °C.";
    if (form.visibilite !== null && (!Number.isFinite(form.visibilite) || form.visibilite < 0)) next.visibilite = "Indiquez une visibilité positive.";
    if (Object.keys(next).length) { setErrors(next); return; }

    const newSpot: Spot | undefined = form.spotId === NEW_SPOT ? { id: crypto.randomUUID(), nom: spot.nom.trim(), pays: spot.pays.trim(), region: spot.region.trim(), type: "autre", description: spot.description.trim() } : undefined;
    const newFish: Poisson[] = addFish ? [{ id: crypto.randomUUID(), nomCommun: fish.nom.trim(), nomScientifique: "", famille: "", description: fish.description.trim() }] : [];
    const newEquipment: Equipement[] = addEquipment ? [{ id: crypto.randomUUID(), nom: equipment.nom.trim(), categorie: "autre", marque: "", description: equipment.description.trim() }] : [];
    const dive: Plongee = { ...form, id: initial?.id ?? crypto.randomUUID(), spotId: newSpot?.id ?? form.spotId, poissonIds: [...form.poissonIds, ...newFish.map((item) => item.id)], equipementIds: [...form.equipementIds, ...newEquipment.map((item) => item.id)] };
    if (!enregistrerPlongeeAvecAjouts(dive, { spot: newSpot, poissons: newFish, equipements: newEquipment }, !!initial)) { setMessage("Impossible d'enregistrer cette plongée."); return; }
    setMessage("Plongée enregistrée ! Retour au carnet…");
    setTimeout(() => router.push("/carnet"), 900);
  }

  if (!data) return <p>Chargement du formulaire…</p>;
  return <form className="panel dive-form" onSubmit={save} noValidate>
    <div className="form-grid">
      <label>Date *<input type="date" value={form.date} onChange={(e) => change("date", e.target.value)} aria-invalid={!!errors.date} />{errorText(errors.date)}</label>
      <label>Spot *<select value={form.spotId} onChange={(e) => change("spotId", e.target.value)} aria-invalid={!!errors.spotId}><option value="">Choisir un spot</option>{data.spots.map((item) => <option value={item.id} key={item.id}>{item.nom} — {item.pays}</option>)}<option value={NEW_SPOT}>Autre / nouveau spot…</option></select>{errorText(errors.spotId)}<small>Vous pouvez aussi <Link className="inline-link" href="/spots">gérer vos spots ici</Link>.</small></label>
    </div>
    {form.spotId === NEW_SPOT && <div className="custom-fields" aria-label="Nouveau spot"><h3>Nouveau spot</h3><div className="form-grid"><label>Nom du spot *<input value={spot.nom} onChange={(e) => { setSpot({ ...spot, nom: e.target.value }); clearError("spotNom"); }} placeholder="Ex. La crique aux rochers" aria-invalid={!!errors.spotNom} />{errorText(errors.spotNom)}</label><label>Pays<input value={spot.pays} onChange={(e) => setSpot({ ...spot, pays: e.target.value })} placeholder="Ex. France" /></label><label>Région<input value={spot.region} onChange={(e) => setSpot({ ...spot, region: e.target.value })} placeholder="Ex. Bretagne" /></label></div><label>Description du spot<textarea rows={3} value={spot.description} onChange={(e) => setSpot({ ...spot, description: e.target.value })} placeholder="Fond rocheux, accès, particularités…" /></label></div>}
    <div className="form-grid dive-essential"><label>Profondeur max (m) *<input type="number" min="0.1" step="0.1" value={form.profondeurMax || ""} onChange={(e) => change("profondeurMax", Number(e.target.value))} aria-invalid={!!errors.profondeurMax} />{errorText(errors.profondeurMax)}</label><label>Durée (min) *<input type="number" min="1" step="1" value={form.duree || ""} onChange={(e) => change("duree", Number(e.target.value))} aria-invalid={!!errors.duree} />{errorText(errors.duree)}</label></div>
    <h2>Les conditions</h2><div className="form-grid"><label>Température (°C)<input type="number" step="0.1" value={form.temperature ?? ""} onChange={(e) => change("temperature", e.target.value === "" ? null : Number(e.target.value))} aria-invalid={!!errors.temperature} />{errorText(errors.temperature)}</label><label>Visibilité (m)<input type="number" min="0" step="0.1" value={form.visibilite ?? ""} onChange={(e) => change("visibilite", e.target.value === "" ? null : Number(e.target.value))} aria-invalid={!!errors.visibilite} />{errorText(errors.visibilite)}</label><label>Courant<select value={form.courant} onChange={(e) => change("courant", e.target.value as Plongee["courant"])}><option value="faible">Faible</option><option value="moyen">Moyen</option><option value="fort">Fort</option></select></label><label>Météo<input value={form.meteo} onChange={(e) => change("meteo", e.target.value)} placeholder="Ensoleillé, nuageux…" /></label></div>
    <h2>Poissons observés</h2><div className="check-grid">{data.poissons.map((item) => <label className="check-item" key={item.id}><input type="checkbox" checked={form.poissonIds.includes(item.id)} onChange={() => toggle("poissonIds", item.id)} />{item.nomCommun}</label>)}</div>
    <label className="check-item custom-toggle"><input type="checkbox" checked={addFish} onChange={(e) => { setAddFish(e.target.checked); clearError("fishNom"); }} /><Plus size={17} /> Autre / nouvelle espèce</label>
    {addFish && <div className="custom-fields"><div className="form-grid"><label>Nom de l&apos;espèce *<input value={fish.nom} onChange={(e) => { setFish({ ...fish, nom: e.target.value }); clearError("fishNom"); }} placeholder="Ex. Poisson-lune" aria-invalid={!!errors.fishNom} />{errorText(errors.fishNom)}</label></div><label>Description de la rencontre<textarea rows={3} value={fish.description} onChange={(e) => setFish({ ...fish, description: e.target.value })} placeholder="Couleurs, taille, comportement…" /></label></div>}
    <h2>Équipement utilisé</h2><div className="check-grid">{data.equipements.map((item) => <label className="check-item" key={item.id}><input type="checkbox" checked={form.equipementIds.includes(item.id)} onChange={() => toggle("equipementIds", item.id)} />{item.nom}</label>)}</div>
    <label className="check-item custom-toggle"><input type="checkbox" checked={addEquipment} onChange={(e) => { setAddEquipment(e.target.checked); clearError("equipmentNom"); }} /><Plus size={17} /> Autre / nouvel équipement</label>
    {addEquipment && <div className="custom-fields"><div className="form-grid"><label>Nom de l&apos;équipement *<input value={equipment.nom} onChange={(e) => { setEquipment({ ...equipment, nom: e.target.value }); clearError("equipmentNom"); }} placeholder="Ex. Lampe de plongée" aria-invalid={!!errors.equipmentNom} />{errorText(errors.equipmentNom)}</label></div><label>Description de l&apos;équipement<textarea rows={3} value={equipment.description} onChange={(e) => setEquipment({ ...equipment, description: e.target.value })} placeholder="Modèle, usage, particularités…" /></label></div>}
    <label>Notes<textarea rows={5} value={form.notes} onChange={(e) => change("notes", e.target.value)} placeholder="Racontez votre plongée…" /></label><div className="form-actions"><button className="button button-primary" type="submit"><Save size={18} />{initial ? "Enregistrer les modifications" : "Enregistrer la plongée"}</button><Link className="button button-muted" href="/carnet"><X size={17} /> Annuler</Link></div>{message && <p className="success-message" role="status">{message}</p>}
  </form>;
}
