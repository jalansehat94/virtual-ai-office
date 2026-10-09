#!/usr/bin/env python3
"""
SecondBrain — GitHub Actions Cloud Telemetry Worker
Runs autonomously in GitHub Cloud every 30 minutes without Heru's laptop being turned on.
Fetches live market data (Gold XAUUSD, BTCUSDT) and refreshes live_state.json.
"""

import json
import os
import time
import urllib.request
from datetime import datetime, timezone, timedelta

WITA = timezone(timedelta(hours=8))
REPO_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
STATE_PATH = os.path.join(REPO_DIR, "live_state.json")

def fetch_gold_price():
    try:
        url = "https://query1.finance.yahoo.com/v8/finance/chart/GC=F?interval=1d&range=1d"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=8) as res:
            data = json.loads(res.read().decode("utf-8"))
            return float(data["chart"]["result"][0]["meta"]["regularMarketPrice"])
    except Exception as e:
        print(f"[WARN] Yahoo Gold price fetch failed: {e}")
        return None

def fetch_btc_price():
    try:
        url = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=8) as res:
            data = json.loads(res.read().decode("utf-8"))
            return float(data["price"])
    except Exception as e:
        print(f"[WARN] Binance BTC price fetch failed: {e}")
        return None

def run_cloud_sync():
    if not os.path.isfile(STATE_PATH):
        print(f"[ERROR] State file not found at {STATE_PATH}")
        return False

    with open(STATE_PATH, "r", encoding="utf-8") as f:
        state = json.load(f)

    now_ts = time.time()
    wita_str = datetime.now(WITA).strftime("%Y-%m-%d %H:%M:%S WITA")

    gold_price = fetch_gold_price()
    btc_price = fetch_btc_price()

    print(f"[*] Cloud Sync executing at {wita_str}")
    print(f"[*] Live Gold (XAUUSD): {gold_price}")
    print(f"[*] Live BTC: {btc_price}")

    # 1. Update Tambang Emas (Mine)
    if "mine" in state and isinstance(state["mine"], dict):
        mine_data = state["mine"].setdefault("data", {})
        mine_data["unix"] = int(now_ts)
        mine_data["waktu_server"] = wita_str
        mine_data["jam_server_kini"] = wita_str
        mine_data["pasar_buka"] = True
        if gold_price:
            mine_data["harga_spot_xau"] = gold_price
            mine_data["tick_terakhir"] = f"Spot: ${gold_price:.2f} · Cloud Feed"

    # 2. Update Divisi 04 Trading & Cloud Telemetry
    if "hosts" in state and isinstance(state["hosts"], list):
        for h in state["hosts"]:
            if h.get("key") == "vps_trading":
                h["time"] = now_ts
                h["fetchedAt"] = now_ts
                # MasAmba Cloud Heartbeat
                for a in h.get("agents", []):
                    if a.get("id") == "masamba":
                        a["lastActive"] = now_ts
                        a["lastTool"] = "cloud_feed"
                        a["task"] = f"Monitoring XAUUSD (${gold_price:.2f})" if gold_price else "Monitoring market cloud feed"

    # 3. Add Cloud Worker Heartbeat metadata
    state["cloud_worker"] = {
        "status": "active",
        "last_sync": wita_str,
        "unix": int(now_ts),
        "source": "GitHub Actions Autonomous Cloud Worker",
        "gold_price": gold_price,
        "btc_price": btc_price
    }

    with open(STATE_PATH, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2, ensure_ascii=False)

    print(f"[SUCCESS] Updated {STATE_PATH} with fresh cloud telemetry.")
    return True

if __name__ == "__main__":
    run_cloud_sync()
