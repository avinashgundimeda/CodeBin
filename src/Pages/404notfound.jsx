import React from 'react'

const NotFound = () => {
  return (
    <div className='min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white px-4'>
      <h1 className='text-9xl font-black text-indigo-500'>404</h1>
      <h2 className='text-3xl font-bold mt-4'>Page Not Found</h2>
      <p className='text-gray-400 mt-3 text-center max-w-md'>
        Looks like you wandered into the void. The page you're looking for doesn't exist or has been moved.
      </p>

    </div>
  )
}

export default NotFound