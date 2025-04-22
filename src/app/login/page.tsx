import { LoginForm } from "@/components/login-form";

export default function page() {
  return (
    <div className="flex w-full min-h-svh justify-center items-center">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
