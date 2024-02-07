import React from 'react'

const BootcmpOver = () => {
  return (
    <div className="flex flex-col items-center text-black">
        <div className="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="#FFCC00" />
        <circle cx="35" cy="35" r="5" fill="black" />
        <circle cx="65" cy="35" r="5" fill="black" />
        <path d="M40 55 Q50 70 60 55" stroke="black" stroke-width="2" fill="transparent" />
        </svg>
        </div>
        <h1 className="text-[22px] text-center font-bold">Oops, the bootcamp application period is over.</h1>
        <p>Please be on the look out for the next cycle of applications...</p>
        
    </div>
  )
}

export default BootcmpOver
