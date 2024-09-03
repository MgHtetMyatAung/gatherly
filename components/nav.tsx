"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Events" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <nav className=" space-x-12 flex items-center">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
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
