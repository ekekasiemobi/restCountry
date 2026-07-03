import { useContext } from 'react'
import {ThemeMode} from '../contex/themeMode'


function Nav() {
  const {mode, toggleMode} = useContext(ThemeMode)
  return (
    <>
        <nav className="md:shadow bg-white dark:bg-slate-800 dark:text-white dark:shadow-zinc-700/70 dark:shadow-lg">
            <div className=" flex justify-between p-4 w-[90vw] m-auto gap-5 text-sm">
                <p>Where in the world?</p>
                {/* <p>Dark Mode</p> */}
                {/* <button onClick={toggleMode} >{mode} Mode</button> */}
                <button onClick={toggleMode} className="font-semibold capitalize text-sm">
                  {mode === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
                </button>
            </div>
           

        </nav>
    </>
  )
}

export default Nav