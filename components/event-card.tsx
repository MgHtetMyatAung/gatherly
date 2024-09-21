import { Clock, MapPin, Star } from "lucide-react";
import { ThemeButton } from "./ui/theme-button";
import Image from "next/image";
import Link from "next/link";

type TEventCardProps = {
    id: number,
    title: string;
    description: string;
    image: string;
    startDate: string;
    orgName: string,
    orgLogo: string,
    location: string,
    platform: string,
};

export default function EventCard({ id, title, description, image, startDate, orgLogo, orgName, location, platform} : TEventCardProps ) {

    const month = new Date(startDate).toLocaleString('default', { month: 'short' });
    const day = new Date(startDate).getDate();

    return (
        <Link href={`events/${id}`} className="bg-gray1 p-1 border border-gray4 rounded-[20px] hover:border-gray6 duration-300 ease-out transition-colors group">
            <div className=" w-full aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                <Image src={image} alt={title} fill className="object-cover object-center group-hover:scale-[1.05] group-hover:-rotate-3 transition-transform duration-300 "/>
                <div className=" absolute inset-0 bg-gradient-to-b from-transparent from-60% to-gray1"/>
            </div>
            <div className=" p-2 space-y-2 -mt-12 z-10 relative">
                <div className=" flex items-center gap-x-1.5">
                    <Image src={orgLogo} alt={orgName} width={14} height={14} className="rounded-full" />
                    <div className=" text-sm font-medium">{orgName}</div>
                </div>
                <div className=" font-semibold text-xl">{title}</div>
                <p className="text-[15px] leading-5 text-gray10">{description}</p>
                <div className="flex justify-start items-center gap-x-4">
                    <div className=" rounded-lg overflow-hidden flex flex-col items-center bg-violet1 ">
                        <div className=" bg-violet9 py-0.5 px-4 uppercase text-sm">{month}</div>
                        <div className="font-medium py-2">{day}</div>
                    </div>
                    <div>
                        <div className=" flex items-center gap-x-1.5">
                            <MapPin size={17} className=" text-gray7"/>
                            <div className=" text-[15px] text-gray11">{location || platform}</div>
                        </div>
                        <div className=" flex items-center gap-x-1.5 mt-2">
                            <Clock size={17} className=" text-gray7"/>
                            <div className=" text-[15px] text-gray11"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}