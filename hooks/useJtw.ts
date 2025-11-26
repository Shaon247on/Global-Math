import { useMemo } from "react";
import { getCookie } from "./cookie";

interface JwtPayload {
  user_id?: string;
  email?: string;
  full_name?: string;
  profile_pic?: string;
  exp?: number;
  iat?: number;
}

export function useJwt() {
  const token = getCookie("access_token");

  const decoded = useMemo<JwtPayload | null>(() => {
    if (!token) return null;

    try {
      const payload = token.split(".")[1];
      if (!payload) return null;

      const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = atob(base64);
      return JSON.parse(jsonPayload) as JwtPayload;
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null;
    }
  }, [token]);

  return decoded;
}