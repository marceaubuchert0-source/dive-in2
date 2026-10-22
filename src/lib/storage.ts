import type { Donnees, Equipement, Plongee, Poisson, Spot } from "./types";
import { photoEquipement, photoPoisson } from "./photos";

const KEY = "dive-in-donnees-v1";
export const merouDetails = { taille: "jusqu'à 1,50 m", profondeurHabituelle: "5 à 50 m", habitat: "fonds rocheux, failles et grottes de Méditerranée", description: "Poisson massif et curieux, le mérou brun vit caché dans les failles rocheuses. Espèce protégée en France, il est le symbole des réserves marines méditerranéennes.", statut: "Espèce protégée" };
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
    { id: "poisson-merou", nomCommun: "Mérou brun", nomScientifique: "Epinephelus marginatus", famille: "Serranidés", ...merouDetails },
    { id: "poisson-poulpe", nomCommun: "Poulpe commun", nomScientifique: "Octopus vulgaris", famille: "Octopodidés" },
    { id: "poisson-saupe", nomCommun: "Saupe", nomScientifique: "Sarpa salpa", famille: "Sparidés" },
    { id: "poisson-girelle", nomCommun: "Girelle commune", nomScientifique: "Coris julis", famille: "Labridés" },
    { id: "poisson-murene", nomCommun: "Murène de Méditerranée", nomScientifique: "Muraena helena", famille: "Murénidés" },
    { id: "poisson-barracuda", nomCommun: "Barracuda", nomScientifique: "Sphyraena barracuda", famille: "Sphyrénidés" },
    { id: "poisson-tortue-verte", nomCommun: "Tortue verte", nomScientifique: "Chelonia mydas", famille: "Chéloniidés" },
  ],
  equipements: [
    { id: "equip-combinaison", nom: "Combinaison 5 mm", categorie: "combinaison", marque: "Cressi" },
    { id: "equip-detendeur", nom: "Détendeur Core", categorie: "détendeur", marque: "Aqua Lung" },
    { id: "equip-masque", nom: "Masque F1", categorie: "masque", marque: "Cressi" },
    { id: "equip-lestage", nom: "Ceinture de lest", categorie: "lestage", marque: "Scubapro" },
    { id: "equip-palmes", nom: "Palmes de plongée", categorie: "palmes", marque: "" },
    { id: "equip-ordinateur", nom: "Ordinateur de plongée", categorie: "ordinateur", marque: "" },
    { id: "equip-gilet-stabilisateur", nom: "Gilet stabilisateur", categorie: "gilet-stabilisateur", marque: "" },
    { id: "equip-bouteille", nom: "Bouteille de plongée", categorie: "bouteille", marque: "" },
  ],
  plongees: [
    { id: "plongee-bali", date: "2026-10-12", spotId: "spot-bali", profondeurMax: 18, duree: 52, temperature: 28, visibilite: 25, courant: "faible", meteo: "Ensoleillé", poissonIds: ["poisson-clown", "poisson-perroquet", "poisson-ange"], equipementIds: ["equip-combinaison", "equip-detendeur", "equip-masque"], notes: "Un jardin de corail magnifique, des couleurs partout." },
    { id: "plongee-maldives", date: "2026-09-28", spotId: "spot-maldives", profondeurMax: 24, duree: 46, temperature: 29, visibilite: 30, courant: "moyen", meteo: "Dégagé", poissonIds: ["poisson-raie", "poisson-perroquet"], equipementIds: ["equip-combinaison", "equip-detendeur", "equip-masque"], notes: "Une rencontre inoubliable avec une raie manta." },
    { id: "plongee-malte", date: "2026-09-15", spotId: "spot-malte", profondeurMax: 32, duree: 41, temperature: 24, visibilite: 20, courant: "faible", meteo: "Ensoleillé", poissonIds: ["poisson-merou"], equipementIds: ["equip-detendeur", "equip-masque", "equip-lestage"], notes: "De superbes jeux de lumière le long du tombant." },
  ],
};
// Les exemples et leurs photos restent utilisables aussi pour un nouveau carnet.
seed.poissons.forEach((fish) => Object.assign(fish, photoPoisson(fish)));
seed.equipements.forEach((item) => Object.assign(item, photoEquipement(item)));

export function lireDonnees(): Donnees {
  if (typeof window === "undefined") return seed;
  try {
    const saved = localStorage.getItem(KEY);
    if (saved !== null) {
      const data = JSON.parse(saved) as Donnees;
      // Migration unique : préserver les espèces personnelles et ne pas recréer le mérou après suppression.
      const migrationKey = `${KEY}-merou-v1`;
      if (!localStorage.getItem(migrationKey)) {
        const merou = data.poissons.find((fish) => fish.id === "poisson-merou");
        if (merou) Object.assign(merou, { ...merouDetails, ...merou });
        else data.poissons.unshift(seed.poissons.find((fish) => fish.id === "poisson-merou")!);
        localStorage.setItem(KEY, JSON.stringify(data));
        localStorage.setItem(migrationKey, "done");
      }
      // Compléter les exemples existants sans réinitialiser les plongées ni rétablir une espèce supprimée.
      const photoMigration = `${KEY}-photos-v1`;
      if (!localStorage.getItem(photoMigration)) {
        for (const fish of seed.poissons) {
          const existing = data.poissons.find((item) => item.id === fish.id);
          if (existing) Object.assign(existing, { image: fish.image, credit: fish.credit });
          else if (!["poisson-clown", "poisson-perroquet", "poisson-raie", "poisson-ange", "poisson-merou"].includes(fish.id)) data.poissons.push({ ...fish });
        }
        for (const item of seed.equipements) {
          const existing = data.equipements.find((entry) => entry.id === item.id);
          if (existing) Object.assign(existing, { image: item.image, credit: item.credit });
          else if (!["equip-combinaison", "equip-detendeur", "equip-masque", "equip-lestage"].includes(item.id)) data.equipements.push({ ...item });
        }
        localStorage.setItem(KEY, JSON.stringify(data));
        localStorage.setItem(photoMigration, "done");
      }
      return data;
    }
    localStorage.setItem(KEY, JSON.stringify(seed));
    localStorage.setItem(`${KEY}-photos-v1`, "done");
    localStorage.setItem(`${KEY}-merou-v1`, "done");
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
