export type GreeningType = "grass" | "sedum" | "shrub" | "tree";

export const GREENING_TYPES: Record<
  GreeningType,
  {
    name: string;
    icon: string;
    co2: number | null;
    co2Unit: string;
    desc: string;
    temp: number;
    recommended?: boolean;
    detail: {
      recommendedPlant: string;
      features: string;
    };
  }
> = {
  grass: {
    name: "잔디",
    icon: "🌱",
    co2: 0.4,
    co2Unit: "kg/㎡/년",
    desc: "관리 용이 · 기본형",
    temp: 2.0,
    detail: {
      recommendedPlant: "잔디 (대표 식재)",
      features: "관리 용이 · 기본형",
    },
  },
  sedum: {
    name: "세덤",
    icon: "🍃",
    co2: 0.5,
    co2Unit: "kg/㎡/년",
    desc: "저관리 · 옥상 적합",
    temp: 2.1,
    recommended: true,
    detail: {
      recommendedPlant: "Sedum spp. (예: 돌나물류)",
      features: "저관리 · 경량 · 옥상 적합",
    },
  },
  shrub: {
    name: "관목",
    icon: "🌿",
    co2: 1.74,
    co2Unit: "kg/㎡/년",
    desc: "집약형 · 고효율",
    temp: 3.0,
    detail: {
      recommendedPlant: "관목 혼합 식재",
      features: "집약형 · 고효율",
    },
  },
  tree: {
    name: "나무",
    icon: "🌳",
    co2: 6.6,
    co2Unit: "kg/그루/년",
    desc: "하중·구조 검토 필요",
    temp: 5.0,
    detail: {
      recommendedPlant: "도심 조경수 (예: 소나무)",
      features: "최대 효과 · 구조 검토 필요",
    },
  },
};

export const SPECIES_OPTIONS: Record<GreeningType, { value: string; label: string }[]> = {
  grass: [{ value: "default", label: "잔디" }],
  sedum: [
    { value: "kamtschaticum", label: "기린초" },
    { value: "album", label: "흰세덤" },
    { value: "spurium", label: "둥근잎꿩의비름" },
    { value: "acre", label: "돌나물" },
  ],
  shrub: [
    { value: "jopap", label: "조팝나무" },
    { value: "hwasal", label: "화살나무" },
    { value: "sachul", label: "사철나무" },
    { value: "hoiyang", label: "회양목" },
    { value: "sancheol", label: "산철쭉" },
  ],
  tree: [
    { value: "sonamu", label: "소나무" },
    { value: "bokjagi", label: "복자기" },
    { value: "magamok", label: "마가목" },
    { value: "kkochsagwa", label: "꽃사과" },
    { value: "seomjatnamu", label: "섬잣" },
    { value: "jumok", label: "주목" },
  ],
};
