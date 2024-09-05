"use client"
import { useState, useEffect } from 'react'

export default function ToTopBtn() {
    const [showButton, setShowButton] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 300) {
                setShowButton(true)   
            } else {
                setShowButton(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className='fixed z-100 bottom-5 right-5'>
            {showButton && (
                <button onClick={scrollToTop} className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            )}
        </div>
    )
}