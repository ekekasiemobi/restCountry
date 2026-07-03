import { Link } from 'react-router-dom'
import Nav from '../../components/nav'
import {useEffect, useState} from 'react'
// import  data  from '../../../db.json'
import { useContext } from 'react'
import { ThemeMode } from '../../contex/themeMode'


function Home() {
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [region, setRegion] = useState("")
    const {mode, toggleMode} = useContext(ThemeMode)
    const [search, setSearch] = useState("")

    const handleRegionChange = (e) => {
        e.preventDefault()
        setRegion(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    useEffect(() => {
        const query = search.trim().toLowerCase()
        const regionQuery = region.trim().toLowerCase()

        let result = countries
        if (query.length > 0) {
            result = result.filter((country) =>
                country.name.toLowerCase().includes(query)
            )
        }
        if (regionQuery.length > 0) {
            result = result.filter((country) =>
                country.region.toLowerCase() === regionQuery
            )
        }

        setFilteredCountries(result)
    }, [countries, search, region])

    useEffect (() =>{
        async function fetchCountry() {
          try{
            const response = await fetch("http://localhost:5005/countries")
            if(!response.ok){
                throw new Error("Failed to fetch Country")
            }
            const data = await response.json()
            setCountries(data)
            // setCountries(Object.values(data))
          }catch(error){
            // setError(error.message)
            console.error(error)
          }  
        }
        fetchCountry()
    },[])
    // console.log(countries)
  return (
    <>
       
        <main className=' bg-stone-100 dark:bg-slate-800 min-h-screen' >
             <Nav />
            <div className='w-[90vw] m-auto'>

                <form action="" className='flex flex-col lg:justify-between lg:items-center lg:flex-row md:flex-row md:justify-between md:items-center'>
                    <input className=' bg-white  p-3 md:shadow dark:bg-slate-800 dark:text-white mt-10 dark:shadow-lg dark:shadow-zinc-700/90' type="search" placeholder='Search for a country' name='search' value={search} onChange={handleSearch}/>

                    <select name="region" id="region" value={region} onChange={handleRegionChange} className='md:shadow p-3 bg-white mt-10 dark:bg-slate-800 dark:text-white dark:shadow-lg dark:shadow-zinc-700/90'
                    >
                        <option value="">Filter by Region</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </form>

                {/* <button className='md:shadow mt-10 px-20 py-1 bg-white'></button> */}


                    <div className='grid grid-cols-1 gap-10 mt-10 lg:grid-cols-4 md:grid-cols-3'>
                    {((search.trim().length > 0 || region.trim().length > 0) ? filteredCountries : countries.slice(10,26)).map((country) => {
                    // console.log(countries)
                    // console.log(Array.isArray(data), data)
                    return(
                        <Link key={country.alpha3Code} to={`/singleCountry/${country.alpha2Code}`} >
                            <div className='bg-white md:shadow-2xs dark:bg-slate-800 dark:text-white'>

                                <div>
                                    <img className='h-40 w-full' src={country.flags.png} alt={country.name} />
                                </div>

                                <div className='p-4'>
                                    <h3 className='font-bold mb-3'>{country.name}</h3>
                                    <p><span  className='font-bold' >Population:</span> {country.population.toLocaleString()}</p>

                                    <p> <span className='font-bold' >Region:</span> {country.region}</p>

                                    <p> <span className='font-bold' >Capital:</span>{country.capital}</p>
                                </div>
                            </div>
                        
                        </Link>
                        
                        
                    )

                    })}
                    
                </div>

            </div>
        </main>
    
    </>
  )
}

export default Home