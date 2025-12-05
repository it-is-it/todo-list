"use server";
import { cookies } from "next/headers";

export async function getAccessToken(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    throw new Error("Authentication token not found");
  }

  return token;
}

export async function setAuthCookies({
  accessToken,
  refreshToken,
  email,
  maxAge = 60 * 60 * 24 * 30,
}: {
  accessToken: string;
  refreshToken: string;
  email: string;
  maxAge?: number;
}) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge,
  };

  const cookieStore = await cookies();
  cookieStore.set("access_token", accessToken, cookieOptions);
  cookieStore.set("refresh_token", refreshToken, cookieOptions);
  cookieStore.set("email", email, cookieOptions);
}

export async function checkAuthStatus() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const email = cookieStore.get("email")?.value;

  return {
    isAuthenticated: !!accessToken,
    email: email || null,
  };
}
