import type { LucideIcon } from "lucide-react";

export default function PageHeading({ icon: Icon, title, subtitle, actions }: { icon: LucideIcon; title: string; subtitle: string; actions?: React.ReactNode }) {
  return <div className="page-top page-heading"><div className="page-heading-copy"><span className="page-heading-icon"><Icon size={24} strokeWidth={1.9} aria-hidden="true" /></span><h1>{title}</h1><p>{subtitle}</p></div>{actions && <div className="page-actions">{actions}</div>}</div>;
}
