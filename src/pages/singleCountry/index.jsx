
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
        
          <div className='w-[90vw] h-screen m-auto'>
              <div className=' mt-10 bg-white md:shadow w-fit px-6 py-3 dark:bg-slate-800 '>
                  <Link to="/" className=''><button className=''>Go Back</button></Link>
              </div>

              <div className='flex gap-14 mt-15'>
                
                <div>
                  <img className='h-70 w-full' src={countries.flags.png} alt={countries.name} />
                </div>

                <div className=' p-4'>
                  <h3 className='font-bold mb-5'>{countries.name}</h3>

                  <h3><span className='font-bold text-black'>Native Name: </span>{countries.native}  </h3>
                  <p><span  className='font-bold' >Population:</span> {countries.population.toLocaleString()}</p>

                  <p> <span className='font-bold text-black' > Sub Region:</span> {countries.region}</p>

                  <p> <span className='font-bold' >Capital:</span>{countries.capital}</p>

                  <h3 className='font-bold mt-10'>{countries.border} <span>Border Countries</span> </h3>
                </div>

                <div className='p-4'>
                  <p><span  className='font-bold' >Top Level Domain:</span> {countries.population.toLocaleString()}</p>

                  <p> <span className='font-bold text-black' >Currencies:</span> {countries.currencie}</p>

                  <p> <span className='font-bold' >Language:</span>{countries.language}</p>
                </div>
                
              </div>

          </div>

        </div>

        {/* <Footer />   */}
    </>
  )
}

export default SingleCountry