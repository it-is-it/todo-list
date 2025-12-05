"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { signupAction } from "../action";
import { useRouter } from "next/navigation";
import { useState } from "react";

function useSignup() {
  return useMutation({
    mutationFn: async (data: {
      username: string;
      email: string;
      password: string;
    }) => {
      return await signupAction(data.username, data.email, data.password);
    },
  });
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const signup = useSignup();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    signup.mutate(
      { username, email, password },
      {
        onSuccess: (result) => {
          if (result?.error) {
            alert(result.error);
            return;
          }
          router.push("/");
        },
      }
    );
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        {/* <CardDescription>
          Enter your information below to create your account
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Userame</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription> */}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            {/* <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field> */}
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={signup.isPending}>
                  {signup.isPending ? "Creating..." : "Create Account"}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Log in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
