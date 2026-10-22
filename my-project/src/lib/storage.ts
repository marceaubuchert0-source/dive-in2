import type { Donnees, Equipement, Plongee, Poisson, Spot } from "./types";

const KEY = "dive-in-donnees-v1";
const seed: Donnees = {
  spots: [
    { id: "spot-bali", nom: "Jardin de corail", pays: "Indonésie", region: "Bali", type: "récif" },
    { id: "spot-maldives", nom: "Turtle Point", pays: "Maldives", region: "Atoll d'Ari", type: "récif" },
    { id: "spot-malte", nom: "Le Grand Bleu", pays: "Malte", region: "Gozo", type: "tombant" },
  ],
  poissons: [
    { id: "poisson-clown", nomCommun: "Poisson-clown", nomScientifique: "Amphiprion ocellaris", famille: "Pomacentridés" },
    { id: "poisson-perroquet", nomCommun: "Poisson-perroquet", nomScientifique: "Scarus ghobban", famille: "Scaridés" },
    { id: "poisson-raie", nomCommun: "Raie manta", nomScientifique: "Mobula birostris", famille: "Mobulidés" },
    { id: "poisson-ange", nomCommun: "Poisson-ange", nomScientifique: "Pygoplites diacanthus", famille: "Pomacanthidés" },
    { id: "poisson-merou", nomCommun: "Mérou brun", nomScientifique: "Epinephelus marginatus", famille: "Serranidés" },
  ],
  equipements: [
    { id: "equip-combinaison", nom: "Combinaison 5 mm", categorie: "combinaison", marque: "Cressi" },
    { id: "equip-detendeur", nom: "Détendeur Core", categorie: "détendeur", marque: "Aqua Lung" },
    { id: "equip-masque", nom: "Masque F1", categorie: "masque", marque: "Cressi" },
    { id: "equip-lestage", nom: "Ceinture de lest", categorie: "lestage", marque: "Scubapro" },
  ],
  plongees: [
    { id: "plongee-bali", date: "2026-10-12", spotId: "spot-bali", profondeurMax: 18, duree: 52, temperature: 28, visibilite: 25, courant: "faible", meteo: "Ensoleillé", poissonIds: ["poisson-clown", "poisson-perroquet", "poisson-ange"], equipementIds: ["equip-combinaison", "equip-detendeur", "equip-masque"], notes: "Un jardin de corail magnifique, des couleurs partout." },
    { id: "plongee-maldives", date: "2026-09-28", spotId: "spot-maldives", profondeurMax: 24, duree: 46, temperature: 29, visibilite: 30, courant: "moyen", meteo: "Dégagé", poissonIds: ["poisson-raie", "poisson-perroquet"], equipementIds: ["equip-combinaison", "equip-detendeur", "equip-masque"], notes: "Une rencontre inoubliable avec une raie manta." },
    { id: "plongee-malte", date: "2026-09-15", spotId: "spot-malte", profondeurMax: 32, duree: 41, temperature: 24, visibilite: 20, courant: "faible", meteo: "Ensoleillé", poissonIds: ["poisson-merou"], equipementIds: ["equip-detendeur", "equip-masque", "equip-lestage"], notes: "De superbes jeux de lumière le long du tombant." },
  ],
};

export function lireDonnees(): Donnees {
  if (typeof window === "undefined") return seed;
  try {
    const saved = localStorage.getItem(KEY);
    if (saved !== null) return JSON.parse(saved) as Donnees;
    localStorage.setItem(KEY, JSON.stringify(seed));
  } catch (error) { console.error("Impossible de lire les données locales", error); }
  return seed;
}

function enregistrer(data: Donnees) {
  localStorage.setItem(KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("dive-in-update"));
}

export function listerPlongees() { return [...lireDonnees().plongees].sort((a, b) => b.date.localeCompare(a.date)); }
export function listerSpots() { return lireDonnees().spots; }
export function listerPoissons() { return lireDonnees().poissons; }
export function listerEquipements() { return lireDonnees().equipements; }

type Collection = "plongees" | "spots" | "poissons" | "equipements";
function ajouter<K extends Collection>(collection: K, item: Donnees[K][number]) {
  const data = lireDonnees();
  (data[collection] as typeof item[]).push(item);
  enregistrer(data);
}
function modifier<K extends Collection>(collection: K, item: Donnees[K][number]) {
  const data = lireDonnees();
  const index = data[collection].findIndex((entry) => entry.id === item.id);
  if (index < 0) return false;
  (data[collection] as typeof item[])[index] = item;
  enregistrer(data);
  return true;
}
function supprimer(collection: Collection, id: string) {
  const data = lireDonnees();
  if (!data[collection].some((entry) => entry.id === id)) return false;
  // Les références restent consultables dans l'historique des plongées.
  if (collection === "spots" && data.plongees.some((p) => p.spotId === id)) return false;
  if (collection === "poissons") data.plongees.forEach((p) => p.poissonIds = p.poissonIds.filter((ref) => ref !== id));
  if (collection === "equipements") data.plongees.forEach((p) => p.equipementIds = p.equipementIds.filter((ref) => ref !== id));
  if (collection === "plongees") data.plongees = data.plongees.filter((p) => p.id !== id);
  if (collection === "spots") data.spots = data.spots.filter((s) => s.id !== id);
  if (collection === "poissons") data.poissons = data.poissons.filter((p) => p.id !== id);
  if (collection === "equipements") data.equipements = data.equipements.filter((e) => e.id !== id);
  enregistrer(data);
  return true;
}

export const ajouterPlongee = (item: Plongee) => ajouter("plongees", item);
export const modifierPlongee = (item: Plongee) => modifier("plongees", item);
export const supprimerPlongee = (id: string) => supprimer("plongees", id);
export const ajouterSpot = (item: Spot) => ajouter("spots", item);
export const modifierSpot = (item: Spot) => modifier("spots", item);
export const supprimerSpot = (id: string) => supprimer("spots", id);
export const ajouterPoisson = (item: Poisson) => ajouter("poissons", item);
export const modifierPoisson = (item: Poisson) => modifier("poissons", item);
export const supprimerPoisson = (id: string) => supprimer("poissons", id);
export const ajouterEquipement = (item: Equipement) => ajouter("equipements", item);
export const modifierEquipement = (item: Equipement) => modifier("equipements", item);
export const supprimerEquipement = (id: string) => supprimer("equipements", id);
