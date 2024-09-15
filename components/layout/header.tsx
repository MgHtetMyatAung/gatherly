"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { getToken } from "@/lib/helper";
import { Button } from "../ui/button";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  const isAuthRoute = ["/login", "/signup", "/forgot-password"].includes(pathname);

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, [pathname]);

  if (isAuthRoute) {
    return null;
  }

  const navItems = [
    { label: "Features", href: "/features" },
    { label: "Products", href: "/products" },
    { label: "Events", href: "/events" },
    { label: "Pricing", href: "/pricing" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="px-12 py-4 border-b border-b-gray3 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold mr-9">
        Logo
          {/* <Image src="/logo.png" alt="Logo" width={32} height={32} /> */}
        </Link>
        <nav>
          <ul className="flex gap-x-9">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-gray10 hover:text-gray12 transition-colors duration-150 text-[15px]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className=" space-x-2">
          <Link href="/signup" className=" py-1 px-3 text-gray11 hover:text-gray12 transition-colors duration-150 font-medium">
            Log in
          </Link>
          <Link href="/signup">
            <Button size="pill">
              Sign up
            </Button>
          </Link>
      </div>
    </header>
  );
}
