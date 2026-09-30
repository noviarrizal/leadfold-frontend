const TOKEN_KEY = "leadfold_token";
const API_KEY_KEY = "leadfold_api_key";

export function saveSession(token: string, apiKey: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(API_KEY_KEY, apiKey);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(API_KEY_KEY);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getApiKey(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(API_KEY_KEY);
}

export function isLoggedIn(): boolean {
  return Boolean(getToken());
}
