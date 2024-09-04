import StatusBarBtn from "./StatusBarBtn"
interface StatusBarProps {
    status: string,
    setStatus: Function
}

export default function StatusBar({ status, setStatus}: StatusBarProps) {
    return (
        <div className="w-full md:max-w-3xl flex justify-center items-center">
            <div className="w-full p-2 rounded-full gap-x-3 flex justify-center items-center bg-[#F3F4F6]">

                <StatusBarBtn status={status} givenStatus={'TODO'} setStatus={setStatus}></StatusBarBtn>

                <StatusBarBtn status={status} givenStatus={'DOING'} setStatus={setStatus}></StatusBarBtn>

                <StatusBarBtn status={status} givenStatus={'DONE'} setStatus={setStatus}></StatusBarBtn>

                
            </div>
        </div>
    )
}