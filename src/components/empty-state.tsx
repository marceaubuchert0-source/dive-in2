import Link from "next/link";
import { ArrowRight, Waves } from "lucide-react";
export default function EmptyState({ message, href, action }: { message: string; href?: string; action?: string }) {
  return <div className="empty-state"><span className="empty-illustration"><Waves size={42} strokeWidth={1.4} aria-hidden="true" /><span className="empty-bubble" /></span><p>{message}</p>{href && action && <Link href={href} className="button button-primary">{action}<ArrowRight size={17} /></Link>}</div>;
}
