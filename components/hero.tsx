import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative w-full h-[calc(100vh-90px)] flex items-center justify-center">
            <Image 
                className="object-cover" 
                src="https://s3-alpha-sig.figma.com/img/9ea6/c2b2/7fe242aadfee9679853e20852ab75f57?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=I3tecNcgivpR77gOy7VXEczMMDiUFolCEk2WxYSDyCwAiay3oGSykFuaOiEFzvoS4mB6K9enU-IDHljVbzO2quUOf6RWW1Jur5o70vI26KXNyh5Pm2SbfUUxzGBu4W7iSgw19hzuxcQiknWIeZASHY-vhZmr9idY7vRrtyMxbw6ENHqUzaVJsky2jJFfYVFY5iq7WQOqxZfj3DRcxlvVAtUIXEvajlIGJnVxbx-7C4eimnNvgyZkqpRV2vWE2EJc8gFIHxEps2lPqs1q4l90Hc08TU~nufByzoTdSn12hdxdLRgjTtSKUWcZyABwVS6ZlDpBpHAJQGO~IAJo4YKQUw__" 
                alt="Hero Bg" 
                fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent"></div>
            <div className="relative z-10 flex flex-col items-center gap-y-5">
                <h1 className=" text-4xl font-semibold">Get Become A Speaker For Next Generation</h1>
                <p className=" text-xl font-medium text-neutral-400">Share your knowledge and experience.</p>
                <Button size="big">Join Now</Button>
            </div>
            <Link href="#" className="flex flex-col items-center  absolute bottom-4 text-yellow-500 ">
            <ChevronDown size="96" strokeWidth="1" className=" animate-bounce"/>
            <div className=" -mt-6">Scroll Down</div>
            </Link>
        </section>
    )
}