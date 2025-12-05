"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
// import Cookies from "js-cookie";

export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      // const refresh = Cookies.get("refresh_token");
      // const access = Cookies.get("access_token");

      // if (!refresh) {
      //   console.error("No refresh token found");
      //   return {};
      // }

      const res = await fetch("http://192.168.1.84:1234/auth/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${access}`,
        },
        // body: JSON.stringify({ refresh }),
      });

      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => ({}));
        throw data;
      }

      return {};
    },

    onSuccess: () => {
      // Cookies.remove("access_token");
      // Cookies.remove("refresh_token");
      router.push("/login");
    },

    onError: (err) => {
      console.error("Logout failed:", err);
    },
  });
}
