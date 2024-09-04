"use client"

import { useState } from "react"

interface TaskCard {
    id: string,
    title: string,
    description: string,
    time: string,
    removeTask: (taskId: string) => void
}

const getUTCTimeFromDate = (dateString: any) => {
    const date = new Date(dateString);
    
    // Get the time in HH:MM format in UTC (24-hour format)
    const time = date.getUTCHours().toString().padStart(2, '0') + ':' + date.getUTCMinutes().toString().padStart(2, '0');
    
    return time;
    }

export default function TaskCard({ id, title, description, time, removeTask}: TaskCard) {

    

    return (
        <div onClick={() => removeTask(id)} className="group relative cursor-pointer my-2 w-full md:max-w-3xl flex justify-between items-start border p-3 rounded-xl hover:bg-red-500 transtion-all duration-150 ease-in">
            
            <div className="flex flex-col relative gap-y-1 ">
                <div className="font-semibold group-hover:opacity-0">
                    🕥 {title}
                </div>

                <div className="text-gray-500 text-sm group-hover:opacity-0">
                    {description}
                </div>
            </div>

            <div className="text-gray-500 group-hover:opacity-0">
                {getUTCTimeFromDate(time)}
            </div>

            <div className=" absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="animate-wiggle size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </div>

        </div>
    )
}