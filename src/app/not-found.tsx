'use client'
// import StarsCanvas from '@/components/StarCanvas/StarCanvas'
import Link from 'next/link'


const Page4041 = () => {
  return (
    <div className="py-16 w-full min-h-screen flex justify-center md:items-center bg-black relative z-0">
      {/* <StarsCanvas /> */}
      <div className="mx-auto max-w-xl lg:max-w-4xl flex flex-col lg:flex-row">

        {/* :ERROR 404 */}
        <div className="relative px-5 lg:border-r-2 border-gray-100">
          <p className="absolute -top-3 md:top-0 left-10 md:left-20 text-base md:text-4xl text-white font-bold uppercase">Error</p>
          <p className="text-9xl md:text-10xl text-white font-extrabold tracking-wider">404</p>
        </div>

        {/* :TEXT CONTAINER */}
        <div className="px-5 flex flex-col md:items-start items-center md:justify-start justify-center">
          <p className="text-3xl md:text-5xl text-white font-bold tracking-wide">Page not found</p>
          <p className="mt-4 text-sm md:text-base text-gray-500 font-medium">The content you’re looking for doesn’t exist. Either it was removed, or you mistyped the link. <br /><br />Sorry about that! Please visit our hompage to get where you need to go.</p>
          <Link href='/' type="button" className="text-white mt-10 relative w-max inline-flex items-center px-7 py-3.5 rounded border border-transparent bg-white md:text-lg font-medium">
            Go back to Homepage
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Page4041
