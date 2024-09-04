
interface StatusBarBtnProps {
    status: string,
    givenStatus: string,
    setStatus: Function
}
export default function StatusBarBtn({ status, givenStatus, setStatus }: StatusBarBtnProps) {
    const btnHandler = () => {
        setStatus(givenStatus)
    }

    return (
        <button onClick={btnHandler} className={`${status === givenStatus ? 'bg-purple-500 text-white' : 'bg-none text-gray-500 hover:bg-purple-100'} w-full py-2.5 font-bold rounded-full transition-all duration-150 ease-in`}>
            {givenStatus === "TODO" ? "To-do" : givenStatus[0] + givenStatus.slice(1).toLowerCase()}
 
        </button>
    )
}