"use server"
import { signIn } from '@/auth'

interface SignInProps {
    redirect: boolean
    email: string,
    password: string
}

export async function SignIn(p0: string, { redirect, email, password }: SignInProps) {
    return await signIn("credentials", {
        redirect,
        email,
        password
    })
}