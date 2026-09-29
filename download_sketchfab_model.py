#!/usr/bin/env python3
"""
Sketchfab 3D Model Importer for SecondBrain Virtual AI Office
Downloads downloadable Animal Crossing CC models via Sketchfab API v3
and places them directly into public/models/.
"""

import sys
import os
import json
import urllib.request
import urllib.error
import urllib.parse
import zipfile
import shutil

# Fix Windows console UTF-8 output
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

MODELS_DIR = os.path.join(os.path.dirname(__file__), "public", "models")
TOKEN_FILE = os.path.join(os.path.dirname(__file__), ".sketchfab_token")

def get_api_token():
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, "r") as f:
            token = f.read().strip()
            if token:
                return token
    if "SKETCHFAB_API_TOKEN" in os.environ:
        return os.environ["SKETCHFAB_API_TOKEN"].strip()
    return None

def search_models(query="animal crossing", limit=10):
    url = f"https://api.sketchfab.com/v3/search?type=models&q={urllib.parse.quote(query)}&downloadable=true&sort_by=-likeCount"
    req = urllib.request.Request(url, headers={"User-Agent": "SecondBrain-Office/1.0"})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("results", [])[:limit]
    except Exception as e:
        print(f"Error searching Sketchfab: {e}")
        return []

def download_model(uid, token, output_name=None):
    if not output_name:
        output_name = uid
    
    url = f"https://api.sketchfab.com/v3/models/{uid}/download"
    req = urllib.request.Request(
        url,
        headers={
            "Authorization": f"Token {token}",
            "User-Agent": "SecondBrain-Office/1.0"
        }
    )
    
    try:
        print(f"Requesting download URL for model {uid}...")
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            
        gltf_info = data.get("gltf")
        if not gltf_info or "url" not in gltf_info:
            print("Download URL not found in response:", data)
            return False
            
        download_url = gltf_info["url"]
        temp_zip = os.path.join(os.path.dirname(__file__), f"temp_{uid}.zip")
        extract_dir = os.path.join(MODELS_DIR, output_name)
        os.makedirs(extract_dir, exist_ok=True)
        
        print(f"Downloading model archive from Sketchfab...")
        urllib.request.urlretrieve(download_url, temp_zip)
        
        print(f"Extracting to {extract_dir}...")
        with zipfile.ZipFile(temp_zip, 'r') as zf:
            zf.extractall(extract_dir)
            
        if os.path.exists(temp_zip):
            os.remove(temp_zip)
            
        print(f"[SUCCESS] Model '{output_name}' downloaded and extracted to {extract_dir}!")
        return True
        
    except urllib.error.HTTPError as e:
        if e.code == 401:
            print("[ERROR 401] Unauthorized. Please provide a valid Sketchfab API Token from https://sketchfab.com/settings/password")
        else:
            print(f"[HTTP ERROR {e.code}]: {e.reason}")
        return False
    except Exception as e:
        print(f"[ERROR]: {e}")
        return False

if __name__ == "__main__":
    token = get_api_token()
    if len(sys.argv) > 1 and sys.argv[1] == "search":
        q = sys.argv[2] if len(sys.argv) > 2 else "animal crossing"
        results = search_models(q)
        print(f"\n--- Found {len(results)} downloadable models for '{q}': ---")
        for idx, m in enumerate(results):
            print(f"[{idx+1}] {m['name']} (UID: {m['uid']}) by {m.get('user', {}).get('displayName', 'Unknown')}")
            viewer_url = m.get('viewerUrl') or f"https://sketchfab.com/3d-models/{m['uid']}"
            print(f"    URL: {viewer_url}")
    elif len(sys.argv) > 1 and sys.argv[1] == "download":
        if not token and len(sys.argv) < 4:
            print("Usage: python download_sketchfab_model.py download <UID> [TOKEN] [NAME]")
            sys.exit(1)
        uid = sys.argv[2]
        api_token = sys.argv[3] if len(sys.argv) > 3 else token
        name = sys.argv[4] if len(sys.argv) > 4 else None
        download_model(uid, api_token, name)
    elif len(sys.argv) > 1 and sys.argv[1] == "set-token":
        if len(sys.argv) < 3:
            print("Usage: python download_sketchfab_model.py set-token <API_TOKEN>")
            sys.exit(1)
        with open(TOKEN_FILE, "w") as f:
            f.write(sys.argv[2].strip())
        print("[OK] Sketchfab API Token saved successfully!")
    else:
        print("SecondBrain Sketchfab Model Importer CLI")
        print("Commands:")
        print("  python download_sketchfab_model.py search [query]")
        print("  python download_sketchfab_model.py set-token <API_TOKEN>")
        print("  python download_sketchfab_model.py download <UID> [NAME]")
