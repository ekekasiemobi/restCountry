// import React from 'react'
import { createContext, useState, useEffect } from "react"

export const ThemeMode = createContext()

export const ModeProvider = ({children}) =>{
    const [mode, setMode] = useState("light")

    useEffect(() =>{
        const savedMode = localStorage.getItem("mode")
        if (savedMode){
            setMode(savedMode)
        }
        document.documentElement.classList.toggle("dark", mode === "dark")
    },[mode])

    const toggleMode = () =>{
        setMode(mode === "light" ? "dark" : "light")
        localStorage.setItem("mode", mode === "light" ? "dark" : "ligth")
    }

    return (
        <>
            <ThemeMode.Provider value={{mode, toggleMode}}>
                {children}
            </ThemeMode.Provider>
        </>
    )
}

export default ModeProvider