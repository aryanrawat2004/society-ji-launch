import { apiRequest } from "./api";

const TOKEN_KEY = "society_admin_token";
const ADMIN_KEY = "society_admin_profile";

export interface AuthProfile {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  is_system_generated?: boolean;
  access_token?: string;
}

export interface AuthLoginResponse {
  message?: string;
  data?: AuthProfile;
}

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);

export const getAuthProfile = (): AuthProfile | null => {
  const raw = localStorage.getItem(ADMIN_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as AuthProfile;
  } catch {
    return null;
  }
};

export const setAuthSession = (profile: AuthProfile) => {
  if (profile?.access_token) {
    localStorage.setItem(TOKEN_KEY, profile.access_token);
  }
  localStorage.setItem(ADMIN_KEY, JSON.stringify(profile));
};

export const clearAuthSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
};

export const adminLogin = async (email: string, password: string) => {
  const payload = await apiRequest<AuthLoginResponse>("/api/auth/admin-login", {
    method: "POST",
    body: JSON.stringify({
      email: email.toLowerCase().trim(),
      password,
    }),
  });

  if (!payload.data?.access_token) {
    throw new Error("Invalid login response from server");
  }

  setAuthSession(payload.data);
  return payload.data;
};

export const userLogin = async (username: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const payload = await apiRequest<AuthLoginResponse>("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  if (!payload.data?.access_token) {
    throw new Error("Invalid login response from server");
  }

  setAuthSession(payload.data);
  return payload.data;
};
