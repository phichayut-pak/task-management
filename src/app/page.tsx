"use client"
import { useSession } from "next-auth/react";
import { useRouter} from "next/navigation";
import { useEffect } from "react";
import Navbar from "./components/Navbar";


export default function Home() {
  
  const { data: session, status} = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('login')
    }
  }, [status, router])

  if(status === "loading") {
    return <div>Loading...</div>
  }



  return (
    <main className="min-h-screen">
      <Navbar></Navbar>
    </main>
  );
}
