from __future__ import annotations

import math
from typing import Iterable

import requests

VWORLD_WFS_URL = "https://api.vworld.kr/req/wfs"


def _bbox_from_point(lat: float, lon: float, radius_m: float) -> tuple[float, float, float, float]:
    meters_per_deg_lat = 111320.0
    meters_per_deg_lon = 111320.0 * math.cos(math.radians(lat))
    dlat = radius_m / meters_per_deg_lat
    dlon = radius_m / meters_per_deg_lon if meters_per_deg_lon else radius_m / meters_per_deg_lat
    return (lon - dlon, lat - dlat, lon + dlon, lat + dlat)


def _point_in_polygon(point: tuple[float, float], polygon: Iterable[tuple[float, float]]) -> bool:
    x, y = point
    inside = False
    pts = list(polygon)
    if len(pts) < 3:
        return False
    j = len(pts) - 1
    for i in range(len(pts)):
        xi, yi = pts[i]
        xj, yj = pts[j]
        intersects = ((yi > y) != (yj > y)) and (
            x < (xj - xi) * (y - yi) / (yj - yi + 1e-12) + xi
        )
        if intersects:
            inside = not inside
        j = i
    return inside


def _extract_polygons(geometry: dict) -> list[list[tuple[float, float]]]:
    if not geometry:
        return []
    geom_type = geometry.get("type")
    coords = geometry.get("coordinates") or []
    polygons: list[list[tuple[float, float]]] = []
    if geom_type == "Polygon":
        if coords:
            polygons.append([(float(x), float(y)) for x, y in coords[0]])
    elif geom_type == "MultiPolygon":
        for poly in coords:
            if poly:
                polygons.append([(float(x), float(y)) for x, y in poly[0]])
    return polygons


def get_building_polygon(coords: tuple[float, float], api_key: str, radius_m: float = 30.0, timeout_s: float = 5.0):
    """Get building polygon using VWorld WFS."""
    
    
    
