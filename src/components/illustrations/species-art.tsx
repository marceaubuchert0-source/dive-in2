import type { Poisson } from "../../lib/types";

export default function SpeciesArt({ fish, className = "" }: { fish: Poisson; className?: string }) {
  const kind = fish.id === "poisson-merou" ? "merou" : fish.id === "poisson-clown" ? "clown" : fish.id === "poisson-perroquet" ? "perroquet" : fish.id === "poisson-raie" ? "raie" : fish.id === "poisson-ange" ? "ange" : "autre";
  const colors = {
    merou: ["#0B3C5D", "#1CA7A8", "#FF7F5C"], clown: ["#FF7F5C", "#fff", "#0B3C5D"],
    perroquet: ["#1CA7A8", "#FF7F5C", "#0B3C5D"], raie: ["#0B3C5D", "#1CA7A8", "#FF7F5C"],
    ange: ["#F5B64D", "#0B3C5D", "#1CA7A8"], autre: ["#1CA7A8", "#0B3C5D", "#FF7F5C"],
  }[kind];
  return <svg className={className} viewBox="0 0 320 220" role="img" aria-label={`Illustration de ${fish.nomCommun}`} xmlns="http://www.w3.org/2000/svg">
    <rect width="320" height="220" rx="20" fill="#E4F4F4"/><circle cx="284" cy="32" r="65" fill="#F4F9FB"/><circle cx="25" cy="194" r="52" fill="#BEE6E4"/>
    <g fill="none" stroke="#fff" strokeWidth="2.5"><circle cx="42" cy="58" r="7"/><circle cx="65" cy="38" r="4"/><circle cx="266" cy="156" r="6"/></g>
    {kind === "raie" ? <g><path d="M156 116C105 80 80 105 39 94c21 39 46 65 103 53l18 51 15-51c57 12 82-14 103-53-41 11-66-14-117 22Z" fill={colors[0]} stroke={colors[1]} strokeWidth="5"/><path d="M155 147c2 27 12 48 16 57" fill="none" stroke={colors[0]} strokeWidth="5" strokeLinecap="round"/><circle cx="139" cy="117" r="3" fill="white"/><circle cx="180" cy="117" r="3" fill="white"/><path d="M152 130q8 6 16 0" fill="none" stroke="white" strokeWidth="2"/></g> : <g>
      <path d="M84 113 32 76l9 40-9 40 52-37" fill={colors[1]} stroke={colors[0]} strokeWidth="4" strokeLinejoin="round"/>
      <path d={kind === "ange" ? "M80 116C117 49 213 49 269 116c-56 67-152 67-189 0Z" : kind === "merou" ? "M77 114c26-48 89-59 154-29 21 10 39 28 50 32-36 50-124 63-177 30-13-8-22-18-27-33Z" : "M78 116c37-47 111-58 167-27l39 27-39 27c-56 31-130 20-167-27Z"} fill={colors[0]} stroke={colors[1]} strokeWidth="4"/>
      <path d="M138 79q31-34 74-27l-12 24M142 153q29 27 70 17l-13-19" fill={colors[1]} stroke={colors[0]} strokeWidth="3"/>
      {kind === "clown" ? <g stroke="white" strokeWidth="14" opacity=".95"><path d="M125 76q18 41 0 79"/><path d="M202 79q-13 35 5 74"/></g> : kind === "perroquet" ? <g fill={colors[1]} opacity=".85"><path d="M121 108q29 11 48 38l-28-5Z"/><path d="M162 84q28 17 41 53l-30-20Z"/><path d="M214 98q18 13 27 36l-22-10Z"/></g> : kind === "merou" ? <g fill={colors[2]} opacity=".8"><circle cx="146" cy="100" r="7"/><circle cx="188" cy="134" r="10"/><circle cx="118" cy="126" r="6"/><circle cx="214" cy="98" r="5"/></g> : kind === "ange" ? <g fill="none" stroke={colors[1]} strokeWidth="8"><path d="M128 81q42 36 20 76"/><path d="M186 77q29 37 2 83"/></g> : <path d="M120 101q50 42 118 11" fill="none" stroke={colors[2]} strokeWidth="7"/>}
      <circle cx="244" cy="108" r="7" fill="white"/><circle cx="246" cy="108" r="3.5" fill="#0B3C5D"/>
    </g>}
    <path d="M12 210q18-31 35-4m236 4q15-37 29-9" fill="none" stroke="#1CA7A8" strokeWidth="5" strokeLinecap="round"/>
  </svg>;
}
