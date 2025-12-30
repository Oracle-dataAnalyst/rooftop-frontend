
import os
import requests
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("VWORLD_API_KEY")
domain = os.getenv("VWORLD_DOMAIN")

print(f"API Key present: {bool(api_key)}")
print(f"Domain: {domain}")

if not api_key:
    print("Error: VWORLD_API_KEY not found in environment.")
    exit(1)

# Parameters from the error URL
# https://api.vworld.kr/req/address?service=address&request=getcoord&format=json&crs=EPSG%3A4326&type=ROAD&address=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%A4%91%EA%B5%AC%20%EC%84%B8%EC%A2%85%EB%8C%80%EB%A1%9C%20110&key=...&domain=rooftop.streamlit.app

url = "https://api.vworld.kr/req/address"
params = {
    "service": "address",
    "request": "getcoord",
    "format": "json",
    "crs": "EPSG:4326",
    "type": "ROAD",
    "address": "서울특별시 중구 세종대로 110",
    "key": api_key
}

if domain:
    params["domain"] = domain

print(f"Requesting to: {url}")
print(f"Params: {params}")

try:
    resp = requests.get(url, params=params, timeout=10)
    print(f"Status Code: {resp.status_code}")
    print(f"Headers: {resp.headers}")
    print(f"Response: {resp.text[:500]}")
    resp.raise_for_status()
    print("Success!")
except Exception as e:
    print(f"Failed: {e}")
