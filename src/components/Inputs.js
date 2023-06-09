import React, { useState } from 'react'
import { UilLocationPoint, UilSearch  } from '@iconscout/react-unicons'

const Inputs = ({setQuery}) => {
  const [city, setCity] = useState('')

  const handleSearchClick = () => {
    if (city !== '') setQuery({q: city})
  }

  

  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input value={city} onChange={e => setCity(e.target.value)} type='text' className='text-xl font-light p-2 focus:outline-none w-full shadow-xl capitalize placeholder:lowercase' placeholder='Search for a city'/>
            <UilSearch size={25} onClick={handleSearchClick} className='text-white cursor-pointer transition ease-out hover:scale-125'/>
            <UilLocationPoint size={25} className='text-white cursor-pointer transition ease-out hover:scale-125'/>
        </div>

        <div className='flex flex-row w-1/4 items-center justify-center'>
            <button name='metric' className='transition ease-out hover:scale-125 text-xl text-white font-light'>°C</button>
            <p className='text-xl text-white mx-1'>I</p>
            <button name='imperial' className='transition ease-out hover:scale-125 text-xl text-white font-light'>°F</button>

        </div>

    </div>
  )
}

export default Inputs