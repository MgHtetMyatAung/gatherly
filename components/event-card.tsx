import { Star } from "lucide-react";
import { ThemeButton } from "./ui/theme-button";
import Image from "next/image";
import Link from "next/link";

type TEventCardProps = {
    id: number,
    title: string;
    description: string;
    image: string;
    startDate: string;
    rating: number | null
};

export default function EventCard({ id, title, description, image, startDate, rating} : TEventCardProps ) {
    return (
        <Link href={`events/${id}`} className=" p-4 bg-black border border-neutral-800 rounded-lg space-y-4 hover:border-neutral-700 duration-150">
            <div className=" w-full aspect-video bg-red-200 rounded relative overflow-hidden">
                <Image src={image} alt={title} fill/>
            </div>  
            <div className=" flex justify-between items-center">
                <div className=" text-lg font-semibold line-clamp-1">{title}</div>
                <div className=" text-yellow-500 text-sm flex items-center gap-x-1 ">
                    <Star size="16"/>
                    <div>{rating || "?"}/5</div>
                </div>
            </div>
                <p className=" text-neutral-500 line-clamp-3">{description}</p>
            <div className="flex justify-between items-center">
                <div className=" text-sm text-neutral-200">{startDate}</div>
                <ThemeButton size="small">Register</ThemeButton>
            </div>
        </Link>
    )
}