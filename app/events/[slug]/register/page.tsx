"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetEventById } from "@/lib/hooks/use-get-event-by-id";
import ProtectedRoute from "@/components/protected-route";
import RegisterForm from '@/components/form/register-form';
import Image from 'next/image';

export default function RegisterPage({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const { data, isLoading, isError } = useGetEventById(params.slug);
    const [isRegistering, setIsRegistering] = useState(false);

    const handleRegister = async () => {
        setIsRegistering(true);
        setTimeout(() => {
            setIsRegistering(false);
            router.push(`/events/${params.slug}`);
        }, 2000);
    };

    return (
        <ProtectedRoute>
            <div className="flex flex-col items-center w-full relative h-[calc(100vh-90px)] p-6">
                <Image src="/image1.png" alt="Image1" fill className="object-cover -z-50 object-center"/>
                <div className=" max-w-[1200px] w-full flex-col items-start">
                <h1 className="text-xl font-semibold mb-10">Register for Event</h1>
                <RegisterForm/>
                </div>
            </div>
        </ProtectedRoute>
    );
}
