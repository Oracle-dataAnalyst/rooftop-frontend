from __future__ import annotations

from functools import lru_cache
from pathlib import Path
import pandas as pd

from core.config import settings

@lru_cache(maxsize=8)
def load_buildings_table() -> pd.DataFrame:
    """Load processed building table.

    Expected columns (example):
    - building_id, name, address, lat, lon, roof_area_m2 (optional)
    """
    path = Path(settings.data_dir) / "processed" / "buildings.parquet"
    if path.exists():
        return pd.read_parquet(path)

    # Fallback: small sample table for demo environments
    sample_path = Path(settings.data_dir) / "processed" / "sample_buildings.csv"
    if sample_path.exists():
        df = pd.read_csv(sample_path)
        # Ensure required columns exist
        required_cols = ["building_id", "name", "address", "lat", "lon", "roof_area_m2"]
        for col in required_cols:
            if col not in df.columns:
                if col == "building_id":
                    df[col] = [f"sample-{i+1}" for i in range(len(df))]
                else:
                    df[col] = None
        return df[required_cols]

    # MVP: empty table if not provided
    return pd.DataFrame(columns=["building_id", "name", "address", "lat", "lon", "roof_area_m2"])

@lru_cache(maxsize=8)
def load_lookup_table(name: str) -> pd.DataFrame:
    path = Path(settings.data_dir) / "lookup" / f"{name}.csv"
    if not path.exists():
        return pd.DataFrame()
    return pd.read_csv(path)
