
import Nav from '../../components/nav'

import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import  {ThemeMode} from '../../contex/themeMode'
import { useContext } from 'react'


function SingleCountry() {

  const { alpha2Code } = useParams()
  const {mode, toggleMode} = useContext(ThemeMode)
  // const [countries, setCountries ] = useState (1) 
  // const country = countries.find((Country => country.alpha3Code === String(alpha3Code)))

  // const navigate = useNavigate();
  const [countries, setCountries ] = useState({
    name: '',
    population: '',
    region: '',
    capital: '',
    flags: { png: '', svg: '' }
  })
  useEffect(() => {
    setTimeout(() => {
      // fetch(`http://localhost:5005/countries/${alpha2Code}`)
      fetch(`http://localhost:5005/countries?alpha2Code=${alpha2Code}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.length > 0) {
          setCountries(data[0]) 
          }
        })  
        .catch(error => console.log(error))
        
    },)  
  }, [alpha2Code])

  return (
    <>
       
        <div className='dark:bg-slate-800 dark:text-white'>
          <Nav />
        
          <div className='w-[90vw] min-h-screen m-auto'>
              <div className=' mt-10 bg-white md:shadow w-fit px-6 py-3 dark:bg-slate-800 dark:shadow-lg dark:shadow-zinc-700/90 '>
                  <Link to="/" className=''><button className=''>Go Back</button></Link>
              </div>

              <div className='flex flex-col gap-14 mt-15 md:flex-row'>
                
                <div>
                  <img className='h-70 w-full' src={countries.flags.png} alt={countries.name} />
                </div>

                <div className=' p-4'>
                  <h3 className='font-bold mb-5'>{countries.name}</h3>

                  <h3><span className='font-bold'>Native Name: </span>{countries.nativeName}  </h3>
                  <p><span  className='font-bold' >Population:</span> {countries.population.toLocaleString()}</p>

                  <p> <span className='font-bold'> Sub Region:</span> {countries.region}</p>

                  <p> <span className='font-bold'>Capital:</span>{countries.capital}</p>

                  <h3 className='font-bold mt-10'>Border Countries: {countries && countries.borders && countries.borders.map((border) => {
                    return(
                      <span>{border}</span>
                    )
                  })}
                  </h3>
                </div>

                <div className='p-4'>
                  <p><span  className='font-bold' >Top Level Domain:</span> {countries.population.toLocaleString()}</p>

                  {/* <p> <span className='font-bold text-black' >Currencies:</span> {countries.currencies.map(currencies =>currencies.code)}</p> */}

                  <p> <span className='font-bold white' >Currencies:</span> {countries && countries.currencies && countries.currencies[0].code}</p>

                  <p> <span className='font-bold' >Language:</span>{countries && countries.languages && countries.languages.map((language) => {
                    return(
                      <span>{language.name}</span>
                    )
                  })}</p>
                </div>
                
              </div>

          </div>

        </div>

        {/* <Footer />   */}
    </>
  )
}

export default SingleCountry