import { Link } from 'react-router-dom'
import Nav from '../../components/nav'
import {useEffect, useState} from 'react'
// import  data  from '../../../db.json'
// import { Link } from 'react-router-dom'


function Home() {
    const [countries, setCountries] = useState([])

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
        <Nav />
        <main className=' bg-stone-100'>
            <div className='w-[90vw] m-auto'>

                <form action="" className=''>
                    <input className='w-80 bg-white mt-10 p-3 md:shadow' type="text" placeholder='Search for a country' />
                </form>

                {/* <button className='md:shadow mt-10 px-20 py-1 bg-white'></button> */}


                <div className='grid grid-cols-4 gap-10 mt-10'>
                    {countries.slice(10,26).map((country) => {
                    // console.log(countries)
                    // console.log(Array.isArray(data), data)
                    return(
                        <Link key={country.alpha3Code} to={`/singleCountry/${country.alpha2Code}`} >
                            <div className='bg-white md:shadow-2xs'>

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