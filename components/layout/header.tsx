import Image from "next/image"
import Link from "next/link"
import Nav from "../nav"
import { Button } from "../ui/button"

export default function Header() {
    return (
        <header className="w-[1200px] mx-auto py-6 grid grid-cols-3">
            <div className="flex items-center">
            <Link href="/">
            <Image
                src="/gatherly.svg"
                width="100"
                height="1"
                alt="Gatherly"
            />
            </Link>
            </div>
            <div className=" flex justify-center items-center">
                <Nav/>
            </div>
            <div className=" flex justify-end gap-x-2.5">
                <Button>Log In</Button>
                <Button intent="secondary">Sign Up</Button>
            </div>
        </header>
    )
}