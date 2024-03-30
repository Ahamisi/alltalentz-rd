import React from 'react'

const OurClients = () => {
  return (
    <section className="bg-black py-12 md:py-[116px]">
    <div className="container mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-semibold text-center mb-8">Trusted by top brands</h2>

        {/* Logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
            {/* First Row */}
            <div className="flex justify-center items-center">
                {/* Logo 1 */}
                <img src="/home-img/clients/puro-clean.png" alt="Puro Clean" className="max-w-xs  h-[60px]" />
            </div>
            <div className="flex justify-center items-center">
                {/* Logo 2 */}
                <img src="/home-img/clients/we-scope.png" alt="We Scope" className="max-w-xs  h-[60px]" />
            </div>
            <div className="flex justify-center items-center">
                {/* Logo 3 */}
                <img src="/home-img/clients/serv-pro.png" alt="Serv pro" className="max-w-xs  h-[60px]" />
            </div>
            <div className="flex justify-center items-center">
                {/* Logo 4 */}
                <img src="/home-img/clients/clean-slate.png" alt="Clean Slate" className="max-w-xs  h-[60px]" />
            </div>
            <div className="flex justify-center items-center">
                {/* Logo 5 */}
                <img src="/home-img/clients/true-north.png" alt="True North" className="max-w-xs  h-[60px]" />
            </div>

            {/* Second Row */}
            <div className="flex justify-center items-center">
                {/* Logo 6 */}
                <img src="/home-img/clients/365-restoration.png" alt="365 Restoration" className="max-w-xs  h-[60px]" />
            </div>
            <div className="flex justify-center items-center">
                {/* Logo 7 */}
                <img src="/home-img/clients/restoration-specialists.png" alt="Restoration Specialists" className="max-w-xs  h-[60px]" />
            </div>
            <div className="flex justify-center items-center">
                {/* Logo 8 */}
                <img src="/home-img/clients/dri.png" alt="DRI" className="max-w-xs  h-[60px]" />
            </div>
            <div className="flex justify-center items-center">
                {/* Logo 9 */}
                <img src="/home-img/clients/crdn.png" alt="CRDN" className="max-w-xs  h-[60px]" />
            </div>
            <div className="flex justify-center items-center">
                {/* Logo 10 */}
                <img src="/home-img/clients/property-doctor.png" alt="Property Doctor" className="max-w-xs  h-[60px]" />
            </div>
        </div>
    </div>
</section>

  )
}

export default OurClients