import Image from 'next/image';

const TrainingApproach = () => {
  const approaches = [
    {
      icon: "/redesign-25/icons/expert.svg",
      title: "Expert-Led Training",
      description: "Our bootcamps are led by seasoned industry professionals who bring a wealth of practical experience to the classroom. These experts will guide you through every step of your learning journey, sharing their insights, tips, and best practices. You'll benefit from their real-world knowledge and learn from their firsthand experiences."
    },
    {
      icon: "/redesign-25/icons/hands-on.svg",
      title: "Hands on Training",
      description: "We believe in learning by doing. Our bootcamps emphasize hands-on training, allowing you to apply your knowledge to practical projects. You'll work on real-world challenges, collaborate with your peers, and receive personalized feedback from your instructors. This immersive approach ensures that you develop the practical skills needed to succeed in your chosen field."
    },
    {
      icon: "/redesign-25/icons/real-world.svg",
      title: "Real-World Projects",
      description: "Throughout the bootcamp, you'll have the opportunity to work on real-world projects that mirror industry standards. These projects will challenge you to think critically, problem-solve, and apply your skills to real-world scenarios. By completing these projects, you'll build a strong portfolio that showcases your abilities to potential employers."
    },
    {
      icon: "/redesign-25/icons/curriculum.svg",
      title: "Comprehensive Curriculum",
      description: "Our rigorous 3-month program equips you with the skills and knowledge to excel in the dynamic restoration industry. You'll master industry-leading software like Xactimate, Encircle and QuickBooks among others, learn to assess property damage, develop effective loss mitigation strategies, ensure code compliance, navigate complex insurance claims, and efficiently manage restoration projects from start to finish."
    },
    {
      icon: "/redesign-25/icons/assessment.svg",
      title: "Work Readiness Assessment",
      description: "At the end of the 3-month program, candidates are highly skilled, industry-ready restoration professionals. You will emerge with a deep understanding of industry standard practices and technical expertise to seamlessly transition into the restoration industry, ready to hit the ground running, and make an immediate impact on your prospective teams!"
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
      
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
              className="p-6 transition-shadow flex items-center"
            >

                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-[#121212]">Our Training<br />Approach!</h2>

            </div>
          {approaches.map((item, index) => (
            <div 
              key={index}
              className="p-6 border border-[#E6E6E6] rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={48}
                  height={48}
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-black">
                {item.title}
              </h3>
              <p className="text-[#4C4C4C] text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingApproach; 