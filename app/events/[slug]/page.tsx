"use client"

import { useGetEventById } from "@/lib/hooks/useGetEventById";
import Image from "next/image";
import { Button } from "@/components/ui/theme-button";
import ProtectedRoute from "@/components/protected-route";

export default function Event({ params }: { params: { slug: string } }) {

    const { event, isLoading, isError } = useGetEventById(params.slug);

    if (isLoading) return <div>Loading event...</div>;

    return (
        <ProtectedRoute>
                    <div className="max-w-[1200px] w-full mx-auto px-4 py-10 flex gap-x-8">
            <div className="aspect-square relative rounded-lg overflow-hidden w-full max-w-[450px]">
                <Image src={event.image} alt={event.title} layout="fill" objectFit="cover" />
            </div>
            <div className="flex flex-col gap-y-6 items-start">
                <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                <div className=" text-xl font-medium">{event.plaform ? `Platform - ${event.plaform}` : `Location - ${event.location}`}</div>
                <p className="text-gray-500">{event.description}</p>
                <Button size="lg" intent="secondary">Register</Button>
            </div>
        </div>
        </ProtectedRoute>
    );
}