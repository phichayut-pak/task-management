import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

export default function SignOutBtn() {
    const onLogout = () => {
        signOut({
            callbackUrl: '/login',
            redirect: true
        })
    }

    return (
        <div onClick={onLogout} className="inline-flex items-center gap-x-2 cursor-pointer px-3 py-2 rounded-lg text-white font-bold bg-purple-500 hover:bg-purple-600 transition-all ease-in-out ">
            <FaSignOutAlt /> Sign out
        </div>
    )
}