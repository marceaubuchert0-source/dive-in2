"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";

const links = [{ href: "/", label: "Accueil" }, { href: "/carnet", label: "Mon carnet" }, { href: "/spots", label: "Spots" }, { href: "/poissons", label: "Poissons" }, { href: "/equipement", label: "Équipement" }];
function Logo({ light = false }: { light?: boolean }) { return <Link className={`logo ${light ? "logo-light" : ""}`} href="/" aria-label="Dive-in, accueil"><span className="logo-mark"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M2 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2M2 14c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/></svg></span><span>Dive<span className="logo-accent">-in</span></span></Link>; }
function Nav({ open, close }: { open: boolean; close: () => void }) {
  const pathname = usePathname();
  return <nav id="primary-nav" className={`main-nav ${open ? "menu-open" : ""}`} aria-label="Navigation principale">{links.map((link) => <Link key={link.href} href={link.href} onClick={close} className={pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/")) ? "nav-active" : ""}>{link.label}</Link>)}</nav>;
}
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <>
    <header className="site-header"><div className="container header-inner"><Logo /><button type="button" className="menu-toggle" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}><span/><span/><span/></button><Suspense fallback={<nav id="primary-nav" className={`main-nav ${open ? "menu-open" : ""}`} aria-label="Navigation principale">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}</nav>}><Nav open={open} close={() => setOpen(false)} /></Suspense><Link className="login-link" href="/carnet/nouveau">Nouvelle plongée <span aria-hidden="true">→</span></Link></div></header>
    {children}
    <footer className="site-footer"><div className="container footer-main"><div className="footer-about"><Logo light /><p>Le carnet de plongée qui vous accompagne partout où l&apos;océan vous appelle.</p></div><div className="footer-links"><h3>Explorer</h3>{links.slice(1).map(({href,label}) => <Link href={href} key={href}>{label === "Mon carnet" ? "Carnet" : label}</Link>)}</div><div className="footer-social"><h3>Suivez l&apos;aventure</h3><p>Un peu d&apos;océan dans votre quotidien.</p><div className="social-icons"><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a><a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶</a></div></div></div><div className="container footer-bottom"><span>Dive-in © 2026</span><span>Fait avec amour pour l&apos;océan.</span></div></footer>
  </>;
}
