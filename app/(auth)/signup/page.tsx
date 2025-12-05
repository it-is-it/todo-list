"use client";

// import { useRouter } from "next/navigation";
import { Suspense } from "react";
// import useSignup from "../hooks/useSignup";
import { SignupForm } from "./signup-form";

export default function Page() {
  // const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const router = useRouter();
  // // const signup = useSignup();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   console.log("Sending signup data:", {
  //     username,
  //     email,
  //     password,
  //   });

  //   signup.mutate(
  //     { username, email, password },
  //     {
  //       onSuccess: (data) => {
  //         console.log("Signup success:", data);

  //         router.push("/login");
  //       },
  //       onError: async (error) => {
  //         let message = "Signup failed. Please try again.";

  //         console.log("Raw error:", error);

  //         if (error.username) message = error.username[0];
  //         else if (error.email) message = error.email[0];
  //         else if (error.password) message = error.password[0];
  //         else if (error.message) message = error.message;

  //         alert(message);
  //       },
  //     }
  //   );
  // };

  return (
    <div className="w-auto ">
      <Suspense fallback={<div>Loading...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
