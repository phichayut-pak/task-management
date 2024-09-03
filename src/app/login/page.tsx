import LoginCard from "../components/LoginCard"
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'


export default async function Login() {
    const session = await getServerSession(authOptions)

    if(session) {
        redirect('/')
    }

    return (
        <main className="p-5 min-h-screen flex justify-center items-center bg-main">
            <LoginCard />
        </main>
    )
}