"use client"

import { useGetEventById } from "@/lib/hooks/use-get-event-by-id";
import Image from "next/image";
import { ThemeButton } from "@/components/ui/theme-button";
import ProtectedRoute from "@/components/protected-route";
import Link from "next/link";

export default function EventSection({ params }: { params: { slug: string } }) {

    const { data, isLoading, isError } = useGetEventById(params.slug);

    return (
        <div className="max-w-[1200px] w-full mx-auto px-4 py-10 flex gap-x-8">
            <div className="aspect-square relative rounded-lg overflow-hidden w-full max-w-[450px]">
                <Image 
                    src={data?.event.image || ''} 
                    alt={data?.event.title || ''} 
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className="flex flex-col gap-y-6 items-start">
                <h1 className="text-3xl font-bold mb-2">{data?.event.title}</h1>
                <div className=" text-xl font-medium">{data?.event.plaform ? `Platform - ${data?.event.plaform}` : `Location - ${data?.event.location}`}</div>
                <p className="text-gray-500">{data?.event.description}</p>
                <ThemeButton size="lg" intent="secondary">
                    <Link href={`/events/${params.slug}/register`}>
                        Register
                    </Link>
                </ThemeButton>
            </div>
        </div>
    );
}