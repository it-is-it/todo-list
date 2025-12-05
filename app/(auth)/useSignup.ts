import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export default function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    }) => {
      const res = await fetch("http://192.168.1.84:1234/auth/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw data;
        // throw {
        //   status: res.status,
        //   message: data.detail || "Signup failed",
        // };
      }

      // Cookies.set("signup_username", data.username, {
      //   expires: 1,
      //   sameSite: "strict",
      // });

      // Cookies.set("signup_email", data.email, {
      //   expires: 1,
      //   sameSite: "strict",
      // });

      return data;
    },

    onSuccess: () => {
      router.push("/login");
    },
  });
}
