"""Télécharge les photos sélectionnées sur Wikimedia Commons et conserve leurs attributions.
Relancer depuis la racine : python3 scripts/download-photos.py
"""
import html
import json
import re
import subprocess
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
# Le libellé recherché est vérifié dans le titre exact avant le téléchargement.
PHOTOS = {
    "poissons/merou-brun.jpg": ("Epinephelus marginatus underwater", "Mero (Epinephelus marginatus), Cabo de Palos, España, 2022-07-15, DD 34.jpg"),
    "poissons/poulpe.jpg": ("Octopus vulgaris underwater", "Pulpo común (Octopus vulgaris), Cathedral Cave, Gozo, Malta, 2021-08-23, DD 28.jpg"),
    "poissons/saupe.jpg": ("Sarpa salpa underwater", "Salema (Sarpa salpa), Madeira, Portugal, 2019-05-31, DD 35.jpg"),
    "poissons/girelle.jpg": ("Coris julis underwater", "Doncella (Coris julis), Cabo de Palos, España, 2022-07-17, DD 69.jpg"),
    "poissons/murene.jpg": ("Muraena helena underwater", "Morena del Mediterráneo (Muraena helena), Regga, Gozo, Malta, 2021-08-23, DD 14.jpg"),
    "poissons/barracuda.jpg": ("Sphyraena barracuda underwater", "Gran barracuda (Sphyraena barracuda), Cozumel, México, 2025-12-20, DD 86.jpg"),
    "poissons/tortue-verte.jpg": ("Chelonia mydas underwater", "Tortuga verde (Chelonia mydas), Anilao, Filipinas, 2023-08-24, DD 131.jpg"),
    "poissons/poisson-perroquet.jpg": ("Scarus ghobban underwater", "Loro barbazul (Scarus ghobban), La Paz, Baja California, México, 2024-12-20, DD 55.jpg"),
    "poissons/poisson-clown.jpg": ("Amphiprion ocellaris underwater", "Amphiprion ocellaris (Clown anemonefish) by Nick Hobgood.jpg"),
    "poissons/raie-manta.jpg": ("Mobula birostris underwater", "Giant Manta AdF.jpg"),
    "poissons/poisson-ange.jpg": ("Pygoplites diacanthus underwater", "Pez ángel real (Pygoplites diacanthus), Anilao, Filipinas, 2023-08-25, DD 225.jpg"),
    "equipement/masque.jpg": ("scuba diving mask", "Diving mask 2021 G1.jpg"),
    "equipement/combinaison.jpg": ("Neoprene wetsuit diving", "Diving suit neoprene.jpg"),
    "equipement/detendeur.jpg": ("scuba diving regulator", "Scuba diving regulator (single).jpg"),
    "equipement/palmes.jpg": ("Diving fins pair", "Technisub Ala Swimming Fins with Coloured Fin Grips.jpg"),
    "equipement/lestage.jpg": ("scuba weight belt", "Diving lifting system - Weight belts.JPG"),
    "equipement/ordinateur.jpg": ("dive computer wrist", "Scuba dive computer.jpeg"),
    "equipement/gilet-stabilisateur.jpg": ("scuba buoyancy compensator", "Bcd - stab.JPG"),
    "equipement/bouteille.jpg": ("scuba diving cylinder", "Perhentian Islands, Scuba diving tank, Diving cylinder, Malaysia.jpg"),
}


def request(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "DiveInWorkshop/1.0 (educational photo credits; contact: divein@example.org)"}), timeout=30)


def clean(text):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]*>", " ", html.unescape(text))).strip()


credits = []
for name, (term, filename) in PHOTOS.items():
    query = urllib.parse.urlencode({"action": "query", "titles": "File:" + filename, "prop": "imageinfo", "iiprop": "url|extmetadata|mime", "iiurlwidth": "800", "format": "json"})
    data = json.load(request("https://commons.wikimedia.org/w/api.php?" + query))
    page = next(iter(data["query"]["pages"].values()))
    if "missing" in page:
        raise RuntimeError(f"Photo introuvable : {filename} ({term})")
    info = page["imageinfo"][0]
    if info["mime"] != "image/jpeg":
        raise RuntimeError(f"Format inattendu : {filename}")
    meta = info["extmetadata"]
    target = ROOT / "public/images" / name
    target.parent.mkdir(parents=True, exist_ok=True)
    source = info.get("thumburl", info["url"])
    target.write_bytes(request(source).read())
    # sips garantit un JPEG de largeur maximum 800px et de petite taille.
    subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "65", "-Z", "800", str(target), "--out", str(target)], check=True, stdout=subprocess.DEVNULL)
    size = target.stat().st_size
    if size >= 200_000:
        subprocess.run(["sips", "-s", "formatOptions", "35", str(target), "--out", str(target)], check=True, stdout=subprocess.DEVNULL)
        size = target.stat().st_size
    if size >= 200_000:
        raise RuntimeError(f"Photo trop lourde : {target} ({size} octets)")
    credits.append({"image": "/images/" + name, "titre": filename, "auteur": clean(meta.get("Artist", {}).get("value", "Auteur non indiqué")), "source": info["descriptionurl"], "licence": clean(meta.get("LicenseShortName", {}).get("value", "Licence non indiquée")), "licenceUrl": meta.get("LicenseUrl", {}).get("value", "")})
    print(name, size, credits[-1]["auteur"][:60], credits[-1]["licence"], flush=True)

(ROOT / "src/lib/photo-credits.json").write_text(json.dumps(credits, ensure_ascii=False, indent=2) + "\n")
