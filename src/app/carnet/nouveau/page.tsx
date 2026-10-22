import Link from "next/link";
import PlongeeForm from "../../../components/plongee-form";
import PageHeading from "../../../components/page-heading";
import { ArrowLeft, Waves } from "lucide-react";
export default function NouvellePlongeePage() { return <main className="inner-page container"><Link className="back-link" href="/carnet"><ArrowLeft size={17} /> Retour au carnet</Link><PageHeading icon={Waves} title="Nouvelle plongée" subtitle="Conservez tous les détails de votre immersion" /><PlongeeForm /></main>; }
