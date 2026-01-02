"""
옥상이몽 v3.4 계수 정의
Updated: 2025.01.02
"""

# CO₂ 흡수 계수 (kg/m²/yr)
CO2_COEF = {
    'grass': 0.4,    # 잔디 - 다수 논문 (0.35~0.6)
    'sedum': 0.5,    # 세덤 - Seyedabadi(2021)
    'shrub': 1.74,   # 관목 - PMC 리뷰 (1.5~4.0)
    'tree': None     # 나무 - 그루당 계산 (TREE_CO2 사용)
}

# 온도 저감 계수 (℃) - 연평균
TEMP_COEF = {
    'grass': 2.0,    # 잔디 - 윤석환(2023)
    'sedum': 2.1,    # 세덤
    'shrub': 3.0,    # 관목 - 윤석환(2023)
    'tree': 5.0      # 나무
}

# 나무 CO₂ (kg/그루/yr) - Legacy/Fallback references
TREE_CO2 = {
    'default': 6.6,      # 소나무 (기본값)
    'bokjagi': 13.8,     # 복자기
    'magamok': 11.4,     # 마가목
    'kkochsagwa': 9.2,   # 꽃사과
    'sonamu': 6.6,       # 소나무
    'seomjatnamu': 5.5,  # 섬잣나무
    'jumok': 5.2         # 주목
}

# UI 표시용 정보 (1단계용 - 표시값은 대표값 또는 범위)
GREEN_TYPE_INFO = {
    'grass': {
        'name': '잔디', 'icon': '🌱',
        'co2': 0.4, 'co2_unit': 'kg/㎡/yr',
        'temp': 2.0, 'desc': '관리 용이, 빠른 설치'
    },
    'sedum': {
        'name': '세덤', 'icon': '🌿',
        'co2': 0.5, 'co2_unit': 'kg/㎡/yr', # 대표값 유지
        'temp': 2.1, 'desc': '건조에 강함, 저관리'
    },
    'shrub': {
        'name': '관목', 'icon': '🌳',
        'co2': 1.74, 'co2_unit': 'kg/㎡/yr', # 대표값 유지
        'temp': 3.0, 'desc': '높은 탄소흡수'
    },
    'tree': {
        'name': '나무', 'icon': '🌲',
        'co2': 6.6, 'co2_unit': 'kg/그루/yr',
        'temp': 5.0, 'desc': '최대 효과, 구조검토 필요'
    }
}

# ==========================================
# 2단계 세부 수종 정보
# ==========================================

# 잔디 (단일)
GRASS_SPECIES_INFO = {
    'default': {'name': '잔디', 'icon': '🌱', 'co2': 0.4}
}

# 세덤 종류별 CO₂ (kg/m²/yr)
SEDUM_SPECIES_INFO = {
    'kamtschaticum': {'name': '기린초', 'icon': '🌿', 'co2': 0.89},
    'album': {'name': '흰세덤', 'icon': '🤍', 'co2': 0.77},
    'spurium': {'name': '둥근잎꿩의비름', 'icon': '💚', 'co2': 0.72},
    'acre': {'name': '돌나물', 'icon': '🌱', 'co2': 0.37}
}

# 관목 종류별 CO₂ (kg/m²/yr)
SHRUB_SPECIES_INFO = {
    'jopap': {'name': '조팝나무', 'icon': '🌸', 'co2': 0.56},
    'hwasal': {'name': '화살나무', 'icon': '🔥', 'co2': 0.54},
    'sachul': {'name': '사철나무', 'icon': '🌳', 'co2': 0.49},
    'hoiyang': {'name': '회양목', 'icon': '🌲', 'co2': 0.45},
    'sancheol': {'name': '산철쭉', 'icon': '💮', 'co2': 0.34}
}

# 나무 종류별 CO₂ (kg/그루/yr)
TREE_SPECIES_INFO = {
    'bokjagi': {'name': '복자기', 'icon': '🍁', 'co2': 13.8, 'category': '낙엽 활엽'},
    'magamok': {'name': '마가목', 'icon': '🌺', 'co2': 11.4, 'category': '낙엽 활엽'},
    'kkochsagwa': {'name': '꽃사과', 'icon': '🍎', 'co2': 9.2, 'category': '낙엽 활엽'},
    'sonamu': {'name': '소나무', 'icon': '🌲', 'co2': 6.6, 'category': '상록 침엽'},
    'seomjatnamu': {'name': '섬잣', 'icon': '🌴', 'co2': 5.5, 'category': '상록 침엽'},
    'jumok': {'name': '주목', 'icon': '🎄', 'co2': 5.2, 'category': '상록 침엽'}
}

# 통합 매핑 (이름으로 접근)
SPECIES_INFO = {
    'grass': GRASS_SPECIES_INFO,
    'sedum': SEDUM_SPECIES_INFO,
    'shrub': SHRUB_SPECIES_INFO,
    'tree': TREE_SPECIES_INFO
}

# 기타 상수
AVAIL_RATE = 0.65  # 옥상 가용율
DEFAULT_BASELINE_SURFACE_TEMP_C = 60.0
