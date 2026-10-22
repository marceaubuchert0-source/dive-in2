import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import PageHeading from "../../components/page-heading";
import { credits } from "../../lib/photos";

export default function CreditsPage() {
  return <main className="inner-page container"><PageHeading icon={Camera} title="Crédits photos" subtitle="Les photographes et les licences des images de Dive-in" /><section><h2 className="subheading">Photos des espèces et du matériel</h2><div className="credits-grid">{credits.map((photo) => <article className="panel credit-card" key={photo.image}><div className="credit-photo"><Image src={photo.image} alt={`Photo : ${photo.titre}`} fill sizes="(max-width: 700px) 100vw, 350px" /></div><h3>{photo.titre}</h3><p>Photo : {photo.auteur}</p><p>Licence : {photo.licence}{photo.licenceUrl && <> · <a href={photo.licenceUrl} target="_blank" rel="noopener noreferrer">Voir la licence</a></>}</p><a href={photo.source} target="_blank" rel="noopener noreferrer">Voir la source sur Wikimedia Commons</a></article>)}</div></section><p className="credits-note">Les photos ont été redimensionnées et compressées. Les images de l’accueil et le fond marin par défaut sont des ressources déjà présentes dans le projet.</p><Link className="back-link" href="/">Retour à l’accueil</Link></main>;
}
