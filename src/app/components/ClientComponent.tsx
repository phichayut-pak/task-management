"use client"

import { useState, useEffect, useRef } from "react"
import StatusBar from "./StatusBar";
import TaskCard from "./TaskCard";
import TaskCardSkeleton from "./TaskCardSkeleton";

const LIMIT = 10

function formatDate (dateString: string) {
    const date = new Date(dateString);

    const day = date.getUTCDate(); 
    const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' }); 
    const year = date.getUTCFullYear(); 

    return `${day} ${month.slice(0, 3).toUpperCase()} ${year}`;
}

function groupTasksByDate (tasks: any) {
    const grouped: any = {}

    tasks.forEach((task:any) => {
        const date = formatDate(task.createdAt)

        if(!grouped[date]) {
            grouped[date] = []
        }

        grouped[date].push(task);
    })

    return grouped
}

const mergeTasksByDate = (prevGroupedTasks: any, newTasks: any) => {
    const updatedTasks = { ...prevGroupedTasks }; // Clone previous grouped tasks

    newTasks.forEach((task: any) => {
        // Extract and format the date from the task
        const date = formatDate(task.createdAt)

        // Check if the date already exists in the grouped object
        if (!updatedTasks[date]) {
        // If the date does not exist, create a new array
        updatedTasks[date] = [];
        }

        // Push the new task to the array for this date
        updatedTasks[date].push(task);
    });

    return updatedTasks; // Return the updated grouped tasks object
};

export default function ClientComponent() {
    const [todoTasks, setTodoTasks]: any = useState([])
    const [groupedTodoTasks, setGroupedTodoTasks]: any = useState({})

    const [doingTasks, setDoingTasks]: any = useState([])
    const [groupedDoingTasks, setGroupedDoingTasks]: any = useState({})

    const [doneTasks, setDoneTasks]: any = useState([])
    const [groupedDoneTasks, setGroupedDoneTasks]: any= useState({})

    
    const [status, setStatus] = useState('TODO')
    const [pageNumbers, setPageNumbers]: any = useState({ TODO: 0, DOING: 0, DONE: 0})
    const [totalPages, setTotalPages]: any = useState({ TODO: 1, DOING: 1, DONE: 1})
    const [loading, setLoading] = useState<boolean>(false)
    const bottomRef = useRef(null);

    const removeTask = (taskId: string) => {
        if (status === "TODO") {
                setGroupedTodoTasks((prev: any) => {
                // Create a copy of the previous tasks
                const updatedTasks = { ...prev };
            
                // Loop through each date in groupedTodoTasks
                Object.keys(updatedTasks).forEach((date) => {
                    // Filter out the task by its ID
                    updatedTasks[date] = updatedTasks[date].filter((task: any) => task.id !== taskId);
            
                    // If no tasks remain for a date, remove that date from the object
                    if (updatedTasks[date].length === 0) {
                    delete updatedTasks[date];
                    }
                });
            
                console.log(updatedTasks); // You can use this for debugging
                return updatedTasks; // Return the updated tasks object
                });
        } else if (status === "DOING") {
            setGroupedDoingTasks((prev: any) => {
                // Create a copy of the previous tasks
                const updatedTasks = { ...prev };
            
                // Loop through each date in groupedTodoTasks
                Object.keys(updatedTasks).forEach((date) => {
                    // Filter out the task by its ID
                    updatedTasks[date] = updatedTasks[date].filter((task: any) => task.id !== taskId);
            
                    // If no tasks remain for a date, remove that date from the object
                    if (updatedTasks[date].length === 0) {
                    delete updatedTasks[date];
                    }
                });
            
                console.log(updatedTasks); // You can use this for debugging
                return updatedTasks; // Return the updated tasks object
                });
        } else if (status == "DONE") {
            setGroupedDoneTasks((prev: any) => {
                // Create a copy of the previous tasks
                const updatedTasks = { ...prev };
            
                // Loop through each date in groupedTodoTasks
                Object.keys(updatedTasks).forEach((date) => {
                    // Filter out the task by its ID
                    updatedTasks[date] = updatedTasks[date].filter((task: any) => task.id !== taskId);
            
                    // If no tasks remain for a date, remove that date from the object
                    if (updatedTasks[date].length === 0) {
                    delete updatedTasks[date];
                    }
                });
            
                console.log(updatedTasks); // You can use this for debugging
                return updatedTasks; // Return the updated tasks object
                });
        }
    };
    

    const fetchTasks = async (page: number, currentStatus: string) => {
        setLoading(true)
        try {
            const offset = pageNumbers[status]
            const response = await fetch(
                `https://todo-list-api-mfchjooefq-as.a.run.app/todo-list?status=${status}&offset=${offset}&limit=${LIMIT}&sortBy=createdAt&isAsc=true`
            )

            const data = await response.json()


            if(data) {
    
                if(status === "TODO") {
                    setTodoTasks((prevTasks: any) => [...prevTasks, ...data.tasks])
                    setGroupedTodoTasks((prevTasks: any) => mergeTasksByDate(prevTasks, data.tasks))
                    console.log(groupedTodoTasks)
                } else if (status === "DOING") {
                    setDoingTasks((prevTasks: any) => [...prevTasks, ...data.tasks])
                    setGroupedDoingTasks((prevTasks: any) => mergeTasksByDate(prevTasks, data.tasks))
                } else if (status === "DONE") {
                    setDoneTasks((prevTasks: any) => [...prevTasks, ...data.tasks])
                    setGroupedDoneTasks((prevTasks: any) => mergeTasksByDate(prevTasks, data.tasks))
                }
            }

            setPageNumbers((prev: any) => ({ ...prev, [status]: data.pageNumber }))
            setTotalPages((prev: any) => ({ ...prev, [status]: data.totalPages }))

            
        } catch (e) {
            console.error("Error fetching tasks: " + e)
        }

        setLoading(false)
    }
        

    useEffect(() => {
        if(status === "TODO" && todoTasks.length === 0) {
            fetchTasks(0, "TODO")
        } else if(status === "DOING" && doingTasks.length === 0) {
            fetchTasks(0, "DOING")
        } else if(status === "DONE" && doneTasks.length === 0) {
            fetchTasks(0, "DONE")
        }
    }, [status])

    // Infinite Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                if(entry.isIntersecting && pageNumbers[status] < totalPages[status] && !loading) {
                    fetchTasks(pageNumbers[status] + 1, status)
                }

            },
            { threshold: 1}
        )

        if(bottomRef.current) {
            observer.observe(bottomRef.current)
        }

        return () => {
            if(bottomRef.current) {
                observer.unobserve(bottomRef.current)
            }
        }
    }, [pageNumbers, totalPages, status, loading])



    return (
        <div className="w-full flex justify-center items-center px-5 flex-col">
            <StatusBar status={status} setStatus={setStatus}></StatusBar>

            <br />

            

            {status === "TODO" && Object.keys(groupedTodoTasks).map((date:any) => (
                <div className="w-full md:max-w-3xl my-2" key={date}>
                    <h2 className="font-bold mb-3">{date}</h2>
                    {groupedTodoTasks[date].map((task:any) => (
                        <TaskCard key={task.id} removeTask={removeTask} id={task.id} title={task.title} description={task.description} time={task.createdAt}/>
                    ))}
                </div>
            ))}

            {status === "DOING" && Object.keys(groupedDoingTasks).map((date:any) => (
                <div className="w-full md:max-w-3xl my-2" key={date}>
                    <h2 className="font-bold mb-3">{date}</h2>
                    {groupedDoingTasks[date].map((task:any) => (
                        <TaskCard key={task.id} removeTask={removeTask} id={task.id} title={task.title} description={task.description} time={task.createdAt}/>
                    ))}
                </div>
            ))}

            {status === "DONE" && Object.keys(groupedDoneTasks).map((date:any) => (
                <div className="w-full md:max-w-3xl my-2" key={date}>
                    <h2 className="font-bold mb-3">{date}</h2>
                    {groupedDoneTasks[date].map((task:any) => (
                        <TaskCard key={task.id} removeTask={removeTask} id={task.id} title={task.title} description={task.description} time={task.createdAt}/>
                    ))}
                </div>
            ))}


            { loading && (
                <div className="w-full md:max-w-3xl my-2">
                    <TaskCardSkeleton></TaskCardSkeleton>
                    <TaskCardSkeleton></TaskCardSkeleton>
                    <TaskCardSkeleton></TaskCardSkeleton>
                    <TaskCardSkeleton></TaskCardSkeleton>
                    <TaskCardSkeleton></TaskCardSkeleton>
                    <TaskCardSkeleton></TaskCardSkeleton>
                    <TaskCardSkeleton></TaskCardSkeleton>
                </div>
            )}
            

            


            <div className="bg-black w-max" ref={bottomRef} style={{ height: '20px' }}></div>
        </div>
    )
}