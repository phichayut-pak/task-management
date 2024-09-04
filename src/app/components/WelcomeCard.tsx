import Image from "next/image"

export default function WelcomeCard({ session }: any) {
    console.log(session)

    return (
        <div className="w-full sm:max-w-lg flex justify-center items-center bg-[#FDF2F8] p-7 rounded-xl gap-x-8">
            <div className="relative flex justify-center items-center rounded-full w-[4.5rem] h-[4.5rem] sm:w-24 sm:h-24 bg-black overflow-hidden">
                <Image 
                    layout="fill" 
                    objectFit="cover" 
                    src={session.user.image_url} 
                    alt="profile image" 
                    className="rounded-full" // This ensures the image is also rounded
                />
            </div>


            <div className="flex flex-col justify-center items-center gap-y-5">
                <h1 className="font-bold text-black text-xl sm:text-2xl">Hi, Welcome Back 👋</h1>
                <h3 className="text-black text-lg">{session.user.name}</h3>
            </div>


        </div>
    )
}