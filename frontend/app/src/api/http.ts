export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

export const request = async (path: string, options?: RequestInit) => {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  return response.json();
};
