"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getToken } from "@/lib/helper";

export default function Nav() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
  }, []);

  const navLinks = [
    { href: "/", label: "Events" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  const authenticatedLinks = [
    ...navLinks,
    { href: "/events/create", label: "Create Event" },
  ];

  const currentLinks = isAuthenticated ? authenticatedLinks : navLinks;

  return (
    <nav className=" space-x-12 flex items-center">
      {currentLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              "dark:text-neutral-400 hover:dark:text-white transition-colors duration-150 ease-out relative",
              {
                "dark:text-white before:content-[''] before:absolute before:-inset-x-2 before:-bottom-2 before:h-px before:bg-blue-500":
                  isActive,
              }
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
