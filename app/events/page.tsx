"use client";

import { Button } from "@/components/ui/button";
import { creato } from "@/lib/font";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, Settings2 } from "lucide-react";
import { Search } from "@/components/ui/search";
import EventCard from "@/components/event-card";

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Ai","Development" , "UiUx", "Cloud", "Cyber Security"];

  return (
    <div className=" p-12 space-y-12">
      <div className=" flex justify-between">
        <div>
          <h1 className={`${creato.className} font-bold text-xl`}>Events</h1>
          <p className=" text-gray10 mt-1.5">
            Browse and discover a curated list of upcoming tech events.
          </p>
        </div>
        <Link href="">
          <Button>Create Event</Button>
        </Link>
      </div>
      <div className=" flex gap-x-2">
        {categories.map((category) => {
          const active = activeCategory === category;
          return (
            <button
              onClick={() => setActiveCategory(category)}
              className={cn("px-3 py-0.5 text-gray11 relative duration-150 ease-out hover:text-gray12", {
                "text-gray1 hover:text-gray1": active,
              })}
            >
              {category}
              {active && (
                <motion.div
                  layoutId="tabBg"
                  transition={{ type: "spring", duration: .3}}
                  className=" absolute bg-white -z-40 rounded-full inset-0"
                />
              )}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between items-center">
        <div className=" flex gap-x-2">
        <Button variant="outline" size="sm" className="flex gap-x-1.5 items-center">
            <ArrowUpDown size={14}/>
            Sort
        </Button>
        <Button variant="outline" size="sm" className="flex gap-x-1.5 items-center">
            <Settings2 size={14}/>
            Filter
        </Button>
        </div>
        <Search/>
      </div>
      <div className=" grid grid-cols-4">
        <EventCard
          id={999}
          image="https://events.xebia.com/hubfs/Xebia-Xpirit-platinum-plus-sponsor-github-universe.jpg"
          title="Github Universe"
          description="Where AI and security transform the developer experience."
          startDate="2024-08-25"
          orgName="Github"
          orgLogo="https://static-00.iconduck.com/assets.00/github-icon-2048x1988-jzvzcf2t.png"
          location=""
          platform="Zoom"
        />
      </div>
    </div>
  );
}
