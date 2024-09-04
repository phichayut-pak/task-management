"use client"
import SignOutBtn from "./SignOutBtn"

export default function Navbar() {
    return (
        <nav className="p-2 sm:p-8 flex justify-between items-center w-full h-10 bg-purple-500">
            <h1 className="text-white text-lg sm:text-xl font-bold">
                Task Management
            </h1>

            <SignOutBtn></SignOutBtn>

        </nav>
    )

}

