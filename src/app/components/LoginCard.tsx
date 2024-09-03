"use client"

import Image from "next/image"
import { signIn } from "next-auth/react"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginCard() {
    const [email, setEmail] = useState("test123@gmail.com")
    const [emailError, setEmailError] = useState("")
    const [isEmailError, setIsEmailError] = useState(false)

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [isPasswordError, setIsPasswordError] = useState(false)
    
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(() => {
        if (session) {
            router.push('/')
        }
    }, [session, router])

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if(email === "" || password === "" || !validateEmail(email)) {

            if(email.trim() === "") {
                setIsEmailError(true)
                setEmailError("required field")
            }
    
            if(password === "") {
                setIsPasswordError(true)
                setPasswordError("required field")
            }

            if(email != "" && !validateEmail(email)) {
                setIsEmailError(true)
                setEmailError("invalid input")
            }

            return
        }


        setLoading(true)

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        })


        if (result?.error) {
            setError("Invalid username or password")

        } else {
            router.push('/')
        }

        setLoading(false)
    }

    function validateEmail(email: string)  {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const onChangeEmail = (e: any) => {
        const { value } = e.target
        setEmail(value)

        if(isEmailError) {
            
            if(email === "") {
                setEmailError("required field")
            } else if(!validateEmail(email) && email != "") {
                setEmailError("invalid format")
            } else {
                setEmailError("")
            }
            
        }

    }

    const onChangePassword = (e: any) => {
        const { value } = e.target
        setPassword(value)

        if(isPasswordError) {
            
            if(password === "") {
                setPasswordError("required field")
            } else {
                setPasswordError("")
            }
        }
    }

    return (
        <div className="p-5 flex flex-col w-full md:max-w-lg justify-center items-center border rounded-md shadow-xl">
            <Image src="/folder.png" alt="folder" width={90} height={90} />

            <div className="w-full flex flex-col font-bold mt-5 gap-y-5">
                <h1 className="text-3xl text-black">Log in</h1>
                <h1 className="text-xl text-black">Welcome To Task Management</h1>
            </div>

            <div className="w-full h-px bg-[#E5E7EB] my-5"></div>

            <form className="w-full flex flex-col gap-y-5" onSubmit={handleSubmit}>

                {error && (
                    <div className="flex w-full p-3 rounded-md border border-red-500 text-red-500 bg-red-100">
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-y-2">
                    <label htmlFor="email" className="text-black">Username</label>
                    <input
                        onChange={(e) => onChangeEmail(e)}
                        value={email}
                        placeholder="username@email.com"
                        type="email"
                        className="border-2 py-3 rounded-lg px-3 text-black bg-white  focus:outline-purple-500"
                    />
                    <label htmlFor="email" className="text-red-500 text-sm">{emailError}</label>
                </div>

                <div className="w-full flex flex-col gap-y-3">
                    <label htmlFor="password" className="text-black">Password</label>
                    <input
                        onChange={(e) => onChangePassword(e)}
                        placeholder="••••••••"
                        type="password"
                        className="border-2 py-3 rounded-lg bg-white text-black px-3 focus:outline-purple-500"
                    />
                    <label htmlFor="password" className="text-red-500 text-sm">{passwordError}</label>
                </div>

        

                <div className="flex justify-center items-center">
                    <button type="submit" className="w-full py-3.5 rounded-lg bg-purple-500 text-white font-bold">
                        {loading ? "Loading..." : "Sign in"}
                    </button>
                </div>
            </form>
        </div>
    )
}
