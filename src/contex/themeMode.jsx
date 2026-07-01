// import React from 'react'
import { createContext, useState, useEffect } from "react"

export const ThemeMode = createContext()

export const ModeProvider = ({children}) =>{
    const [mode, setMode] = useState("light")

    useEffect(() =>{
        document.documentElement.classList.toggle("dark", mode === "dark")
    },[mode])

    const toggleMode = () =>{
        setMode(mode === "light" ? "dark" : "light")
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