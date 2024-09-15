import { creato } from "@/lib/font";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="fixed w-80 h-80 rounded-full bg-violet5 -z-50 blur-[300px] top-16" />
      <div className=" flex flex-col items-center gap-y-8 -mt-14">
        <Link
          href="#"
          className="text-sm p-1 rounded-full bg-violet1 flex gap-x-2.5 items-center"
        >
          <div className=" px-1.5 tracking-wider rounded-full bg-violet11 text-violet5 font-medium">
            V.1.0
          </div>
          <div className="flex gap-x-0.5 text-gray11 capitalize">
            How it work
            <ChevronRight size={14} className="mt-1" />
          </div>
        </Link>
        <div className="flex flex-col items-center">
          <h1 className={`${creato.className} font-bold text-5xl text-gray12`}>
            Elevate Your Tech Gatherings
          </h1>
          <p className=" max-w-[500px] text-lg mt-4 text-center text-gray10">
            Simplify event planning with Gatherly. We provide all the tools you
            need to manage your tech events effortlessly.
          </p>
        </div>
        <div className=" flex gap-x-4">
          <Button size="lg">Get Start for Free</Button>
          <Link
            href="/events"
            className="group px-4 h-11 flex items-center gap-x-2  text-gray11 hover:text-gray12 duration-150"
          >
            <span className=" font-medium text-lg">Join Events</span>
            <ChevronRight size={16} className="mt-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
