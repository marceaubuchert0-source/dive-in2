import type { Equipement } from "../../lib/types";

export default function EquipmentArt({ categorie }: { categorie: Equipement["categorie"] }) {
  return <svg className="equipment-art" viewBox="0 0 144 120" role="img" aria-label={`Illustration : ${categorie}`} xmlns="http://www.w3.org/2000/svg">
    <rect width="144" height="120" rx="18" fill="#E4F4F4"/><circle cx="121" cy="20" r="36" fill="#F4F9FB"/><circle cx="18" cy="110" r="28" fill="#BEE6E4"/>
    {categorie === "combinaison" ? <g fill="#0B3C5D" stroke="#1CA7A8" strokeWidth="3" strokeLinejoin="round"><path d="m54 18-21 11-13 36 16 6 11-21 3 54h44l3-54 11 21 16-6-13-36-21-11-12 13H66Z"/><path d="M72 32v70M51 68h42" fill="none" stroke="#90DAD5"/></g>
    : categorie === "détendeur" ? <g fill="none" stroke="#0B3C5D" strokeWidth="6" strokeLinecap="round"><path d="M41 84C12 62 32 23 65 34s14 60 45 48"/><path d="M61 31h28"/><rect x="94" y="70" width="29" height="23" rx="7" fill="#1CA7A8" stroke="#0B3C5D"/><circle cx="68" cy="38" r="15" fill="#F4F9FB"/><path d="M68 38 73 29" stroke="#FF7F5C"/></g>
    : categorie === "masque" ? <g stroke="#0B3C5D" strokeWidth="5" strokeLinejoin="round"><path d="M19 55c25-26 81-26 106 0l-9 32c-13 10-29 5-44-9-15 14-31 19-44 9Z" fill="#1CA7A8"/><path d="M72 78V54m-45 4-13-5m103 5 13-5" fill="none"/><path d="M36 60h28v15q-13 13-28 5Zm44 0h28v20q-15 8-28-5Z" fill="#C8ECEB" strokeWidth="2"/></g>
    : categorie === "lestage" ? <g stroke="#0B3C5D" strokeWidth="4" strokeLinejoin="round"><path d="M15 60h114v16H15Z" fill="#1CA7A8"/><rect x="48" y="47" width="48" height="42" rx="5" fill="#0B3C5D"/><rect x="58" y="55" width="28" height="26" rx="3" fill="#E4F4F4"/><path d="M86 68h20" fill="none" stroke="#FF7F5C"/></g>
    : <g fill="none" stroke="#0B3C5D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"><path d="M46 40 31 53v41h82V53L98 40" fill="#1CA7A8"/><path d="M55 43V31a17 17 0 0 1 34 0v12M51 70h42"/><circle cx="72" cy="69" r="7" fill="#FF7F5C"/></g>}
    <g fill="none" stroke="white" strokeWidth="2"><circle cx="24" cy="23" r="5"/><circle cx="35" cy="12" r="3"/></g>
  </svg>;
}
