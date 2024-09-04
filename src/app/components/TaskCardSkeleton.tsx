

export default function TaskCardSkeleton() {
    return (

        <div className="group relative cursor-pointer my-2 w-full md:max-w-3xl flex justify-between items-start border p-3 rounded-xl">
            
            <div className="flex flex-col relative gap-y-3 ">
                <div className="animate-pulse w-32 h-5 bg-gray-400 rounded-lg">
                    
                </div>

                <div className="animate pulse w-64 h-4 bg-gray-400 rounded-lg">
                    
                </div>
            </div>

            <div className="animate-pulse w-12 h-5 bg-gray-400 rounded-lg">
                
            </div>

        

        </div>
    )
}