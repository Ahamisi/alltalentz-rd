import Image from "next/image"
const Offerings = () => {



    return (
      <div className="py-16 bg-transparent md:px-[30px] lg:px-0">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8 md:grid-cols-2">
            <div className="flex flex-row items-center gap-2 md:gap-[38px]">
              <div>
                <Image src="/offerings/estimate.png" height="78" width="78"/>
              </div>
              <h3 className="text-m md:text-m md:text-xl font-semibold">Estimators</h3>
            </div>
  
            <div className="flex flex-row items-center gap-2 md:gap-[38px]">
              <div>
                <Image src="/offerings/a-assistants.svg" height="78" width="78"/>
              </div>
              <h3 className="text-m md:text-xl font-semibold">Administrative Assistants</h3>
            </div>
  
  
            <div className="flex flex-row items-center gap-2 md:gap-[38px]">
              <div>
                <Image src="/offerings/v-assistants.png" height="78" width="78"/>
              </div>
              <h3 className="text-m md:text-xl font-semibold">Virtual Assistants</h3>
            </div>
  
            <div className="flex flex-row items-center gap-2 md:gap-[38px]">
            <div>
                <Image src="/offerings/tele-assistants.png" height="78" width="78"/>
              </div>
              <h3 className="text-m md:text-xl font-semibold">Telemarketing Assistants</h3>
            </div>
  
  
  
            <div className="flex flex-row items-center gap-2 md:gap-[38px]">
            <div>
                <Image src="/offerings/sm-strategists.png" height="78" width="78"/>
              </div>
              <h3 className="text-m md:text-xl font-semibold">Digital Marketers / Social Media Strategists</h3>
            </div>
  
  
  
  
            <div className="flex flex-row items-center gap-2 md:gap-[38px]">
            <div>
                <Image src="/offerings/designers-dev.png" height="78" width="78"/>
              </div>
              <h3 className="text-m md:text-xl font-semibold">Designers / Software Developers</h3>
            </div>
  
  
  
            <div className="flex flex-row items-center gap-2 md:gap-[38px]">
            <div>
                <Image src="/offerings/account-receivables.png" height="78" width="78"/>
              </div>
              <h3 className="text-m md:text-xl font-semibold">Account Receivables</h3>
            </div>
  
  
  
            <div className="flex flex-row items-center gap-2 md:gap-[38px]">
            <div>
                <Image src="/offerings/qb-specialists.png" height="78" width="78"/>
              </div>
              <h3 className="text-m md:text-xl font-semibold">Quick book Specialists</h3>
            </div>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
        </div>
      </div>
    )
  }
  
  export default Offerings
  