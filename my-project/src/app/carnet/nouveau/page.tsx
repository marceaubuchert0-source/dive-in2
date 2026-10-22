import Link from "next/link";
import PlongeeForm from "../../../components/plongee-form";
export default function NouvellePlongeePage() { return <main className="inner-page container"><Link className="back-link" href="/carnet">← Retour au carnet</Link><div className="page-top"><div><span className="eyebrow dark-eyebrow">UNE NOUVELLE AVENTURE</span><h1>Nouvelle <em>plongée</em></h1><p>Conservez tous les détails de votre immersion.</p></div></div><PlongeeForm /></main>; }
