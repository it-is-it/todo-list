import { LoginForm } from "./login-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
