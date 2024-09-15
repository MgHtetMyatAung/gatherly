"use client"

import { useRouter } from 'next/navigation';
import ProtectedRoute from "@/components/protected-route";
import CreateForm from '@/components/form/create-form';
import Image from 'next/image';

export default function CreateEventPage() {
    const router = useRouter();

    return (
        <ProtectedRoute>
            <div className="flex flex-col items-center w-full relative min-h-[calc(100vh-90px)] p-6">
                <Image src="/image2.png" alt="Background" fill className="object-cover -z-50 object-center"/>
                <div className="max-w-[1200px] w-full flex-col items-start">
                    <h1 className="text-xl font-semibold mb-10">Create New Event</h1>
                    <CreateForm />
                </div>
            </div>
        </ProtectedRoute>
    );
}
