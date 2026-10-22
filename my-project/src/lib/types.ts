export type Plongee = { id: string; date: string; spotId: string; profondeurMax: number; duree: number; temperature: number | null; visibilite: number | null; courant: "faible" | "moyen" | "fort"; meteo: string; poissonIds: string[]; equipementIds: string[]; notes: string };
export type Spot = { id: string; nom: string; pays: string; region: string; type: "récif" | "épave" | "tombant" | "autre" };
export type Poisson = { id: string; nomCommun: string; nomScientifique: string; famille: string };
export type Equipement = { id: string; nom: string; categorie: "combinaison" | "détendeur" | "masque" | "lestage" | "autre"; marque: string };
export type Donnees = { plongees: Plongee[]; spots: Spot[]; poissons: Poisson[]; equipements: Equipement[] };
