"use server"
import LoginCard from "../components/LoginCard"
import { useEffect } from "react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"


export default async function Login() {
    const session = await auth()
    if(session) {
        redirect('/')
    }

    return (
        <main className="p-5 min-h-screen flex justify-center items-center bg-main">
            <LoginCard />
        </main>
    )
}