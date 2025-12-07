import { Suspense } from "react";
import { SignupForm } from "./signup-form";

export default function Page() {
  return (
    <div className="w-auto ">
      <Suspense fallback={<div>Loading...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
