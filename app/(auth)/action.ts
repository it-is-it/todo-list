"use server";

import { cookies } from "next/headers";

export async function loginAction(username: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    if (typeof errorData === "object" && errorData !== null) {
      const firstKey = Object.keys(errorData)[0];
      const value = errorData[firstKey];

      if (Array.isArray(value) && typeof value[0] === "string") {
        return { error: value[0] };
      }
    }

    if (typeof errorData.detail === "string") {
      return { error: errorData.detail };
    }

    return { error: "Login failed" };
  }

  const data = await res.json();
  const cookieStore = await cookies();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 60 * 60 * 24 * 30,
  };

  cookieStore.set("access_token", data.access, cookieOptions);
  cookieStore.set("refresh_token", data.refresh, cookieOptions);
  cookieStore.set("username", username, cookieOptions);

  return { success: true };
}

export async function signupAction(
  username: string,
  email: string,
  password: string
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    if (typeof errorData === "object" && errorData !== null) {
      const firstKey = Object.keys(errorData)[0];
      const value = errorData[firstKey];

      if (Array.isArray(value) && typeof value[0] === "string") {
        return { error: value[0] };
      }
    }

    return { error: errorData.detail || "Signup failed" };
  }

  const data = await res.json();

  const cookieStore = await cookies();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 60 * 60 * 24 * 30,
  };

  if (data.access_token) {
    cookieStore.set("access_token", data.access_token, cookieOptions);
  }

  if (data.refresh) {
    cookieStore.set("refresh_token", data.refresh, cookieOptions);
  }

  cookieStore.set("username", username, cookieOptions);

  return { success: true };
}

export async function refreshAccessToken() {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("refresh_token")?.value;

  if (!refresh) return null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Refresh token failed:", data);
      return null;
    }

    if (!data.access) {
      console.error("Refresh response missing access token:", data);
      return null;
    }

    cookieStore.set("access_token", data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return data.access;
  } catch (err) {
    console.error("Refresh error:", err);
    return null;
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  cookieStore.delete("username");
}
