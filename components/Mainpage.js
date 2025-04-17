import React from 'react'

const Mainpage = () => {
    return (
        <div className='flex flex-col gap-5 justify-center items-center h-screen'>
            <div className='text-3xl'>
                Enter any location in the URL
            </div>
            <div className='text-xl'>
                http://real-state-vosco.vercel.app/[cityName]
            </div>
            <div className='text-lg bg-gray-500 p-2 rounded-xl'>
               Eg: http://real-state-vosco.vercel.app/gurgaon
            </div>
        </div>
    )
}

export default Mainpage