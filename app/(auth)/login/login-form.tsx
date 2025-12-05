"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "../action";
import { useMutation } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
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

function useLogin() {
  return useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      return await loginAction(data.username, data.password);
    },
  });
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const login = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    login.mutate(
      { username, password },
      {
        onSuccess: (result) => {
          if (result?.error) {
            alert(result.error);
            return;
          }
          router.push("/");
        },
        onError: (error) => {
          if (error instanceof Error) {
            console.log(error.message);
          } else {
            console.log("Unknown error", error);
          }
        },
      }
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription className="text-center">
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={login.isPending}>
                  {login.isPending ? "Logging in..." : "Login"}
                </Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
