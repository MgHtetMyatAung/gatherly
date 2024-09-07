import SignupForm from "@/components/form/signup-form";
import Link from "next/link";

export default function SignupPage() {
  return (
    <>
      <div>
        <h2 className="mt-6 text-xl font-medium">Create your account</h2>
      </div>
      <SignupForm />
      <div className="text-sm text-neutral-500 text-center">
        Already have an account?
        <Link href="/login" className="hover:text-white hover:underline duration-150 px-1">Login</Link>
      </div>
    </>
  );
}
