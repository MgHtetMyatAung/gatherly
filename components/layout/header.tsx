"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { ThemeButton } from "../ui/theme-button";
import Nav from "../nav";
import { getToken, removeToken } from "@/lib/helper";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthRoute = ["/login", "/signup", "/forgot-password"].includes(
    pathname
  );

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  const logoutHandle = () => {
    removeToken();
    setIsLoggedIn(false);
    router.push("/login");
  };

  if (isAuthRoute) {
    return null;
  }

  return (
    <header className="max-w-[1200px] w-full mx-auto p-6 grid grid-cols-3">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/gatherly.svg" width="100" height="1" alt="Gatherly" />
        </Link>
      </div>
      <div className=" flex justify-center items-center">
        <Nav />
      </div>
      <div className=" flex justify-end gap-x-2.5">
        {isLoggedIn ? (
          <ThemeButton onClick={logoutHandle}>Log out</ThemeButton>
        ) : (
          <>
            <ThemeButton>
              <Link href="/login">Log In</Link>
            </ThemeButton>
            <ThemeButton intent="secondary">
              <Link href="/signup">Sign Up</Link>
            </ThemeButton>
          </>
        )}
      </div>
    </header>
  );
}
