import LoginForm from "@/components/form/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div>
        <h2 className="mt-6 text-xl font-medium">Log in to your account</h2>
      </div>
      <LoginForm />
      <div className="text-sm text-neutral-500 text-center">
        Don't have an account?
        <Link href="/signup" className="hover:text-white hover:underline duration-150 px-1">Sign up</Link>
      </div>
    </>
  );
}
