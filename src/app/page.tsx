
import { auth } from "@/auth";
import Navbar from "./components/Navbar";
import ClientComponent from "./components/ClientComponent";
import WelcomeCard from "./components/WelcomeCard";
import { redirect } from "next/navigation";
import axios from "axios";



export default async function Home() {

  const session = await auth()

  if(!session) {
    redirect('/login')
  }



  return (
    <main className="min-h-screen">
      <Navbar />

    
      <div className="w-full flex justify-center items-center p-5 mb-5">
        <WelcomeCard session={session} />
      </div>

      
      <ClientComponent></ClientComponent>

    </main>
  );
}
