const teamMembers = [
    {
      name: "Sadiq",
      lastName: "Isu",
      title: "MBA",
      role: "Founder & CEO",
      image: "/redesign-25/teams/sadiq-isu.jpg",
      bio: "Sadiq Isu is a seasoned professional with extensive expertise in the restoration industry, honed through key roles at renowned companies such as PuroClean and Kroger. As the founder and leader of All Talentz, he now spearheads a dynamic talent outsourcing firm dedicated to delivering exceptional staffing solutions to small, medium, and large organizations."
    },
    {
      name: "Abdul",
      lastName: "Isu",
      title: "Ph.D",
      role: "Chairman/Co-Founder",
      image: "/redesign-25/teams/abdul.jpg",
      bio: "Dr Abdulmumin Isu is a renowned global business leader, with the passion for solving problems across different industries. With great experience at Corporate America and a strong background in the sciences, outsourcing, manufacturing, venture capital as well as Business Administration, Dr Isu drives the vision of transforming lives and restoring the confidence of the global market in the African community."
    },
    {
      name: "Thompson",
      lastName: "Opurum",
      role: "Director, Operations",
      image: "/redesign-25/teams/tommy.jpg",
      bio: "Thompson Opurum holds a B.Sc. in Mathematics/Statistics from the University of Lagos, a Masters in Economics from the University of Aberdeen, and is a PMP-certified professional with the Project Management Institute (PMI) as well as a member of the Chartered Institute of Procurement and Supply (CIPS). With over 15 years of experience in project management, logistics, procurement, supply chain, he is a visionary leader known for his strategic decision-making and goal-driven leadership."
    },
    {
        name: "Gina",
        lastName: "Isu",
        role: "Director of Marketing",
        image: "/redesign-25/teams/gina-isu.jpg",
        bio: "Gina Isu is a dynamic entrepreneur, wife, and devoted mother of four. Known for her adventurous spirit and deep love for God, Gina's journey has been resilient, ambitious, and successful across various fields. From a young age, she displayed an entrepreneurial mindset, engaging in trade in her home country, and laying the foundation for a life of business endeavors. "
      },
    {
      name: "Michael",
      lastName: "Nwoseh",
      role: "Business and Digital Solutions Director",
      image: "/redesign-25/teams/michael.jpg",
      bio: "Michael is the Business and Digital Solutions Director for All Talentz LLC. He is a seasoned growth strategist with over a decade of experience in propelling businesses toward optimal growth.  "
    },
   
    {
      name: "Samuel",
      lastName: "Akingbade",
      role: "Head of Product & Marketing",
      image: "/redesign-25/teams/samuel-akingbade.jpg",
      bio: "Samuel is a dynamic Solutions Architect with a decade of marketing expertise and four years of experience running a successful digital agency. He has consulted with over 140 clients across 18+ industries, with a special passion for collaborating with emerging challenger brands. Samuel has spearheaded the digital and business strategy for the Creative Intelligence Group and is currently leading the marketing efforts for Rest Lives’ innovative African fintech product, Savewyze "
    },
    {
      name: "Kehinde",
      lastName: "Oluwafemi",
      role: "HR Manager",
      image: "/redesign-25/teams/kehinde-oluwafemi.jpg",
      bio: "Kehinde (Kenny) Oluwafemi is a passionate, results-driven HR professional with over three years of professional experience in Performance Management, Recruitment, Employee Relations, and Policy Development. At All Talentz, as the Human Resource Manager, Kenny has driven several strategic HR initiatives aimed at creating a better company culture and improving employee engagement toward higher organizational efficiency."
    },
    {
      name: "Haolat",
      lastName: "Ogbomo",
      role: "HR Manager",
      image: "/redesign-25/teams/haolat-ogbomo.jpg",
      bio: "With over a decade year of dedicated service in Human Resources, Haolat brings an extensive expertise in talent acquisition, employee relations, and organizational development. I am committed to fostering a productive and inclusive workplace environment that supports both company success and employee well-being."
    },

    {
        name: "Adetayo",
        lastName: "Obinaike",
        role: "Head, SW Engineering",
        image: "/redesign-25/teams/adetayo-obinaike.jpg",
        bio: "Adetayo is an experienced Product and Marketing Manager with over a decade of experience cutting across multinationals such as Nokia, Microsoft and HMD Global. Within this period, he built great collaborations with major Mobile Operators, Marketing Agencies, Retail brands, and Marketing Influencers across West Africa. Currently he leads a fantastic team of Software Engineers and Product developers in All Talentz LLC."
    },
    {
        name: "Helen-Sylvanus",
        lastName: "Essiet",
        role: "Snr. Relationship Manager",
        image: "/redesign-25/teams/helen-essiet.jpg",
        bio: "Helen Essiet-Sylvanus is a dynamic Senior Relationship Manager with a decade of experience in customer service and relationship management across several prestigious organizations. Known for her dedication, passion, and drive. Helen tackles every task with unwavering commitment. She lives by the mantra, If you can think it, you can do it, and firmly believes that excuses are the tools of the incompetent, hindering organizational growth. Helen is devoted to the Alltalentz vision of restoring excellence globally making her an invaluable asset to any team."
    },
    {
        name: "Akwaowo",
        lastName: "Willie",
        role: "Snr. Relationship Manager",
        image: "/redesign-25/teams/willie-akwaowo.jpg",
        bio: "Experienced in building strong client relationships and driving strategic growth across varied sectors. Now leading client engagement initiatives at All Talentz."
    },
  ];
  
  const Team = () => {
    return (
      <section className="md-padding relative bg-cover bg-center bg-no-repeat py-[30px] md:py-[128px] bg-[#0E0E0E] px-[15px] md:px-0" 
        style={{backgroundImage: "url('/rest-home.svg')"}}>
        <div className="py-16 text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-5xl font-bold mb-8 text-center">
              Our Amazing <span className="text-[#F99621]">Team</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-[30px] md:mt-[60px] flex justify-center">
              {teamMembers.map((member, index) => (
                <div key={index} className="relative group overflow-hidden rounded-[12px]">
                  <img
                    src={member.image}
                    alt={`${member.name} ${member.lastName}`}
                    className="w-full h-full object-cover aspect-[3/5]"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent group-hover:opacity-0 transition-opacity">
                    <h3 className="text-lg md:text-2xl font-semibold">
                      {member.name} {member.lastName}
                      {member.title && <span className="text-[12px] text-[#F99621]">&nbsp;{member.title}</span>}
                    </h3>
                    <p className="text-[14px] text-[#F99621]">{member.role}</p>
                  </div>
                  
                  <div className="absolute inset-0 bg-black/90 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 overflow-y-auto">
                    <h3 className="text-lg md:text-2xl font-semibold mb-2">
                      {member.name} {member.lastName}
                      {member.title && <span className="text-[12px] text-[#F99621]">&nbsp;{member.title}</span>}
                    </h3>
                    <p className="text-[14px] text-[#F99621] mb-3">{member.role}</p>
                    <p className="text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Team;