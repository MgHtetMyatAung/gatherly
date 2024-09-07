import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full grid grid-cols-2 p-2">
      <div className="rounded-lg p-6 relative">
        <Image src="/gatherly.svg" width="100" height="1" alt="Gatherly" />
        <Image src="/image2.png" alt="Image2" className="object-cover -z-50" fill/>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="space-y-8 max-w-64">
          {children}
        </div>
      </div>
    </div>
  );
}
