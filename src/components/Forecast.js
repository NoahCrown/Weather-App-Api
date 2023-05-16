import React from 'react'
import { iconUrlFromCode } from '../services/weatherService'

const Forecast = ({title, items}) => {
    console.log(items)
  return (
    <div>
        <div className='flex flex-col item-center justify-start mt-6'>
            <p className='text-white font-medium uppercase'>
                {title}
            </p>
            <hr className="border-t border-gray-300 my-2"/>
        </div>

        <div className='flex flex-row items-center justify-between text-white'>

            {items.map(val => (

                <div className='flex flex-col items-center justify-center'>
                <p className='font-light text-sm'>
                    {val.title}
                </p>
                <img src={iconUrlFromCode(val.icon)} alt='' className='w-12 my-1'/>

                <p className='font-medium'>{val.temp.toFixed()}°</p>

            </div>

            )) }

            

            

        </div>

    </div>
  )
}

export default Forecast