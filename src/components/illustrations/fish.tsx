export default function FishIllustration({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 520 320" role="img" aria-label="Illustration d'un poisson dans les eaux du lagon" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="fishBody" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#1CA7A8"/><stop offset="1" stopColor="#0B3C5D"/></linearGradient><linearGradient id="fishWater" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#D9F2F1"/><stop offset="1" stopColor="#F4F9FB"/></linearGradient></defs>
    <rect width="520" height="320" rx="28" fill="url(#fishWater)"/><circle cx="435" cy="70" r="95" fill="#C5E9E9" opacity=".65"/><circle cx="78" cy="295" r="115" fill="#B3DEDE" opacity=".5"/>
    <g fill="none" stroke="#fff" strokeWidth="3" opacity=".8"><circle cx="91" cy="95" r="9"/><circle cx="119" cy="67" r="5"/><circle cx="395" cy="241" r="7"/><circle cx="415" cy="217" r="4"/></g>
    <path d="M112 165C83 136 63 140 43 142c14 22 17 35 14 52 17-5 36-2 55-18" fill="#0B3C5D"/><path d="M225 98c29-21 70-34 106-25-9 21-22 37-33 50" fill="#137985"/><path d="M245 212c25 21 65 25 91 14-15-12-24-24-31-40" fill="#137985"/>
    <path d="M101 161c30-51 94-72 163-65 80 8 150 57 174 75-26 39-103 78-178 77-77-1-135-34-159-87Z" fill="url(#fishBody)" stroke="#0B3C5D" strokeWidth="5"/>
    <path d="M130 154c95-36 178-14 271 19M160 187c85 26 171 32 240-11" fill="none" stroke="#8AD8D3" strokeWidth="5" opacity=".55"/><path d="M280 132c-4 22-2 42 13 55l-49 6c-8-24-8-46 0-66" fill="#FF7F5C" opacity=".82"/><path d="M357 126c-4 14-4 29 0 40l-29 16c-7-20-5-41 2-56" fill="#FF7F5C" opacity=".68"/>
    <circle cx="378" cy="150" r="10" fill="#fff"/><circle cx="381" cy="150" r="5" fill="#0B3C5D"/><path d="M414 181c-16 7-27 8-36 4" fill="none" stroke="#062B43" strokeWidth="4" strokeLinecap="round"/>
    <path d="M23 293c25-32 41-28 52-7m17 34c14-35 34-45 51-21m313 21c20-30 34-30 46-12" fill="none" stroke="#1CA7A8" strokeWidth="6" strokeLinecap="round" opacity=".6"/>
  </svg>;
}
