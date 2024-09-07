"use client"

import { useGetEvents } from "@/lib/hooks/useGetEvents";
import { TEvent } from "@/lib/types";
import EventCard from "../event-card";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Event() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Ai", "UiUx", "Web Development", "Cloud"];

  const { events, isLoading, isError } = useGetEvents();

  return (
    <section id="event" className="max-w-[1200px] w-full mt-12 px-6">
      <h1 className="text-xl font-semibold">Events</h1>
      <div className="flex space-x-4 my-8">
        {categories.map((category) => (
          <button
            key={category}
            className={cn(
              "px-4 py-1.5 rounded-full border border-gray-500 text-gray-500",
              {
                "bg-blue-500 text-white border-blue-500":
                  activeCategory === category,
              }
            )}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {isLoading ? (
          <div className="col-span-full text-center">Loading events...</div>
        ) : isError ? (
          <div className="col-span-full text-center text-red-500">Error loading events. Please try again later.</div>
        ) : events && events.data ? (
          events.data.map((event: TEvent) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              image={event.image}
              startDate={event.start_date}
              rating={event.rating}
            />
          ))
        ) : (
          <div className="col-span-full text-center">No events found.</div>
        )}
      </div>
    </section>
  );
}