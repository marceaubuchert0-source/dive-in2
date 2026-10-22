import credits from "./photo-credits.json";
import type { Equipement, Poisson } from "./types";

export const defaultPhoto = "/images/dive-reef.jpg";
const fishImages: Record<string, string> = {
  "poisson-merou": "merou-brun", "poisson-poulpe": "poulpe", "poisson-saupe": "saupe", "poisson-girelle": "girelle", "poisson-murene": "murene", "poisson-barracuda": "barracuda", "poisson-tortue-verte": "tortue-verte", "poisson-perroquet": "poisson-perroquet", "poisson-clown": "poisson-clown", "poisson-raie": "raie-manta", "poisson-ange": "poisson-ange",
};
const equipmentCategories = ["masque", "combinaison", "détendeur", "palmes", "lestage", "ordinateur", "gilet-stabilisateur", "bouteille"] as const;
const byPath = new Map(credits.map((photo) => [photo.image, photo]));

export function photoPoisson(fish: Pick<Poisson, "id" | "nomCommun" | "nomScientifique" | "image">) {
  const found = Object.entries(fishImages).find(([id]) => id === fish.id);
  const byName = Object.entries(fishImages).find(([id]) => fish.nomCommun.toLowerCase().includes(id.replace("poisson-", "").replaceAll("-", " ")));
  const image = fish.image || (found || byName ? `/images/poissons/${(found || byName)![1]}.jpg` : defaultPhoto);
  return { image, credit: byPath.get(image)?.auteur ?? "" };
}
export function photoEquipement(item: Pick<Equipement, "categorie" | "image">) {
  const image = item.image || (equipmentCategories.includes(item.categorie as typeof equipmentCategories[number]) ? `/images/equipement/${item.categorie}.jpg` : defaultPhoto);
  return { image, credit: byPath.get(image)?.auteur ?? "" };
}
export { credits };
