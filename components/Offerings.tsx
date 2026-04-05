import Image from "next/image"
const Offerings = ({notHome=false}) => {



    return (
      <div className="md:py-16 bg-transparent md:px-[30px] lg:px-0">
        <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-row items-center gap-2 md:gap-[38px]">
            <div className="">
                <Image src="/offerings/estimate.png" alt="estimators" height="78" width="78"/>
              </div>
              <h3 className={`text-[15px] md:text-xl font-semibold ${notHome? 'bg-["f6f6f6"] md:bg-transparent' : 'bg-[#2f2f2f] md:bg-[#0e0e0e]' }  p-[22px] md:p-0 rounded-[5px] md:rounded-none ml-[-25px] md:ml-0 w-full`}>Estimators</h3>
            </div>
  
            <div className="flex flex-row items-center gap-2 md:gap-[38px]">
              <div className="">
                <Image src="/offerings/a-assistants.png" alt="Administrative Assistants" height="78" width="78"/>
              </div>
              <h3 className={`text-[15px] md:text-xl font-semibold ${notHome? 'bg-["f6f6f6"] md:bg-transparent' : 'bg-[#2f2f2f] md:bg-[#0e0e0e]' }  p-[22px] md:p-0 rounded-[5px] md:rounded-none ml-[-25px] md:ml-0 w-full`}>Administrative Assistants</h3>
            </div>
  
  
            <div className="flex flex-row items-center gap-2 md:gap-[38px]">
            <div className="">
                <Image src="/offerings/v-assistants.png" alt="Virtual Assistants" height="78" width="78"/>
              </div>
              <h3 className={`text-[15px] md:text-xl font-semibold ${notHome? 'bg-["f6f6f6"] md:bg-transparent' : 'bg-[#2f2f2f] md:bg-[#0e0e0e]' }  p-[22px] md:p-0 rounded-[5px] md:rounded-none ml-[-25px] md:ml-0 w-full`}>Virtual Assistants</h3>
            </div>
  
            <div className="flex flex-row items-center gap-2 md:gap-[38px]">
            <div className="">
                <Image src="/offerings/tele-assistants.png" alt="tele assistants" height="78" width="78"/>
              </div>
              <h3 className={`text-[15px] md:text-xl font-semibold ${notHome? 'bg-["f6f6f6"] md:bg-transparent' : 'bg-[#2f2f2f] md:bg-[#0e0e0e]' }  p-[22px] md:p-0 rounded-[5px] md:rounded-none ml-[-25px] md:ml-0 w-full`}>Telemarketing Assistants</h3>
            </div>
  
  
  
            <div className="flex flex-row items-center gap-2 md:gap-[38px]">
            <div className="">
                <Image src="/offerings/sm-strategists.png" alt="Social Media Strategists" height="78" width="78"/>
              </div>
              <h3 className={`text-[15px] md:text-xl font-semibold ${notHome? 'bg-["f6f6f6"] md:bg-transparent' : 'bg-[#2f2f2f] md:bg-[#0e0e0e]' }  p-[22px] md:p-0 rounded-[5px] md:rounded-none ml-[-25px] md:ml-0 w-full`}>Digital Marketers / Social Media Strategists</h3>
            </div>
  
  
  
  
            <div className="flex flex-row items-center gap-2 md:gap-[38px]">
            <div className="">
                <Image src="/offerings/designers-dev.png" alt="Designers and Developers" height="78" width="78"/>
              </div>
              <h3 className={`text-[15px] md:text-xl font-semibold ${notHome? 'bg-["f6f6f6"] md:bg-transparent' : 'bg-[#2f2f2f] md:bg-[#0e0e0e]' }  p-[22px] md:p-0 rounded-[5px] md:rounded-none ml-[-25px] md:ml-0 w-full`}>Designers / Software Developers</h3>
            </div>
  
  
  
            <div className="flex flex-row items-center gap-2 md:gap-[38px]">
            <div className="">
                <Image src="/offerings/account-receivables.png" alt="Account Receivables" height="78" width="78"/>
              </div>
              <h3 className={`text-[15px] md:text-xl font-semibold ${notHome? 'bg-["f6f6f6"] md:bg-transparent' : 'bg-[#2f2f2f] md:bg-[#0e0e0e]' }  p-[22px] md:p-0 rounded-[5px] md:rounded-none ml-[-25px] md:ml-0 w-full`}>Account Receivables</h3>
            </div>
  
  
  
            <div className="flex flex-row items-center gap-2 md:gap-[38px]">
            <div className="">
                <Image src="/offerings/qb-specialists.png" alt="Quick Book Specialists" height="78" width="78"/>
              </div>
              <h3 className={`text-[15px] md:text-xl font-semibold ${notHome? 'bg-["f6f6f6"] md:bg-transparent' : 'bg-[#2f2f2f] md:bg-[#0e0e0e]' }  p-[22px] md:p-0 rounded-[5px] md:rounded-none ml-[-25px] md:ml-0 w-full`}>Quick book Specialists</h3>
            </div>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
        </div>
      </div>
    )
  }
  
  export default Offerings
  