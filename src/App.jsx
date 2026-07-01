import Home from './pages/home' 
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Home from "./pages/home"
import SingleCountry from "./pages/singleCountry"
import {ModeProvider} from './contex/themeMode'
function App() {

  return (
    <BrowserRouter>
      <ModeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singleCountry/:alpha2Code" element={<SingleCountry />} />
        </Routes>
      </ModeProvider>
    </BrowserRouter>
  )
}

export default App
