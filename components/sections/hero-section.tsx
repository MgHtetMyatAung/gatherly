import Image from "next/image";
import { ThemeButton } from "../ui/theme-button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
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
                <h1 className=" text-5xl font-semibold text-center">Elevate your Event <br/>
                with our Cutting Edge Platform</h1>
                <p className=" text-lg text-neutral-400">STailored Solutions for the Modern Tech Event Organizer.</p>
                <ThemeButton size="lg">Join Now</ThemeButton>
            </div>
            {/* <Link href="#events" className="flex flex-col items-center  absolute bottom-4 text-yellow-500 ">
            <ChevronDown size="96" strokeWidth="1" className=" animate-bounce"/>
            <div className=" -mt-6">Scroll Down</div>
            </Link> */}
        </section>
    )
}