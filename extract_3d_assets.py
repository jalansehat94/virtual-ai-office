import urllib.request, zipfile, io, os

target_dir = r"d:\SecondBrain\01_knowledge\projects\virtual_ai_office\public\models"
os.makedirs(target_dir, exist_ok=True)

# 1. Download Furniture Kit
print("Downloading furniture-kit...")
url_furn = "https://kenney.nl/media/pages/assets/furniture-kit/440e0608a4-1677580847/kenney_furniture-kit.zip"
req = urllib.request.Request(url_furn, headers={"User-Agent": "Mozilla/5.0"})
content_furn = urllib.request.urlopen(req).read()

furn_models = [
    "bookcaseClosedWide.glb", "bookcaseOpen.glb", "desk.glb", "deskCorner.glb",
    "chairDesk.glb", "chairModernCushion.glb", "chairRounded.glb", "tableCoffee.glb",
    "table.glb", "lampRoundFloor.glb", "benchCushion.glb", "sofa.glb"
]

with zipfile.ZipFile(io.BytesIO(content_furn)) as z:
    for item in z.namelist():
        basename = os.path.basename(item)
        if basename in furn_models and item.endswith(".glb"):
            out_path = os.path.join(target_dir, basename)
            with open(out_path, "wb") as f:
                f.write(z.read(item))
            print(f"Extracted: {basename}")

# 2. Download Nature Kit
print("\nDownloading nature-kit...")
url_nat = "https://kenney.nl/media/pages/assets/nature-kit/37ac38a37b-1677698939/kenney_nature-kit.zip"
req = urllib.request.Request(url_nat, headers={"User-Agent": "Mozilla/5.0"})
content_nat = urllib.request.urlopen(req).read()

nat_models = [
    "tree_pineDefault.glb", "tree_pineRound.glb", "tree_oak.glb",
    "plant_bush.glb", "flower_red.glb", "flower_yellow.glb", "fence_wood.glb", "rock_stone.glb"
]

with zipfile.ZipFile(io.BytesIO(content_nat)) as z:
    for item in z.namelist():
        basename = os.path.basename(item)
        if basename in nat_models and item.endswith(".glb"):
            out_path = os.path.join(target_dir, basename)
            with open(out_path, "wb") as f:
                f.write(z.read(item))
            print(f"Extracted: {basename}")

print("\nDone! All 3D GLB assets downloaded and placed in public/models/.")
