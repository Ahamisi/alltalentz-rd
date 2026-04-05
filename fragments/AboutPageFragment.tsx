import Image from "next/image";
import Milestone from "@/components/homeRD/Milestone";
import MobileMilestone from "@/components/homeRD/MobileMilestone";
import Team from "@/components/homeRD/Team";
import MainFooter from "@/components/MainFooter";
import PageHeader from "@/components/PageHeader";

export default function About() {
  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      <PageHeader about={true} showBg={false}>
        <div className="max-w-7xl mx-auto px-4 lg:flex relative h-[100%] items-center py-20">
          {/* Left Column */}
          <div className="lg:w-[45%] flex flex-col">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
              The Best{" "}
              <span className="text-[#FFB300]">
                Value
                <br />
                Solution
              </span>{" "}
              for your
              <br />
              workforce needs.
            </h1>

            <p className="text-white text-lg md:text-xl font-light leading-relaxed max-w-xl">
              All Talentz is more than just a recruitment company; We connect you with the best
              remote talent in Africa. Whether you need skilled, experienced, or reliable talent, we
              have the perfect match for you. And the best part is, you get amazing value for your
              money!
            </p>
          </div>

          {/* Right Column - Map */}
          <div className="hidden lg:block lg:w-[55%] pl-12">
            <Image
              src="/african-maps.png"
              alt="Global Talent Map"
              width={800}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </PageHeader>

      {/* our value proposition */}
      <section className="relative bg-white py-20 px-4 bg-[url('/redesign-25/backgrounds/partners.svg')] bg-center bg-cover bg-no-repeat">
        <div className="max-w-7xl mx-auto">
          {/* Icon and Mission Statement */}
          <div className="mb-16">
            <Image
              src="/icons/target.svg"
              alt="Mission Target"
              width={64}
              height={64}
              className="w-16 h-16 mb-6"
            />
            <h2 className="text-4xl md:text-4xl font-bold mb-8 text-black">Our Mission</h2>
            <p className="text-2xl md:text-3xl lg:text-2xl leading-tight max-w-6xl text-black">
              Our mission is to build and deploy high-quality talent through structured assessments
              and global training, expanding our footprint to serve clients and professionals across
              the world.
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Stat Card 1 */}
            <div className="bg-[#F99621] rounded-xl p-8 text-white">
              <div className="text-5xl font-bold mb-2">100+</div>
              <div className="text-xl">Clients</div>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-[#F99621] rounded-xl p-8 text-white">
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-xl">Locations</div>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-[#F99621] rounded-xl p-8 text-white">
              <div className="text-5xl font-bold mb-2">99%</div>
              <div className="text-xl">Positive feedbacks</div>
            </div>

            {/* Stat Card 4 */}
            <div className="bg-[#F99621] rounded-xl p-8 text-white">
              <div className="text-5xl font-bold mb-2">5000+</div>
              <div className="text-xl">Quality Professionals</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12">
          <h2 className="text-4xl md:text-4xl mb-8 text-black">Our Vision</h2>
          <p className="text-2xl md:text-3xl lg:text-2xl leading-tight max-w-6xl text-black">
            Restoring excellence globally through innovative outsourcing and transformative
            technology solutions.
          </p>
        </div>
      </section>

      <section className="relative bg-white py-24 px-4  bg-[url('/redesign-25/backgrounds/frame-pattern-1.svg')] bg-center bg-cover bg-no-repeat">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <h2 className="text-4xl font-bold text-center mb-16 text-[#121212]">Our core Value</h2>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Teamwork */}
            <div className="p-6 rounded-[8px] bg-white border border-[#EBEBF0]">
              <div className="mb-6">
                <Image
                  src="/icons/service.svg"
                  alt="Service"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#121212]">Teamwork</h3>
              <p className="text-gray-600 leading-relaxed">
                Together, we go further. We believe the best outcomes are built collectively. We
                show up for each other, communicate openly, and combine our strengths to deliver
                results no individual could achieve alone. At AllTalentz, collaboration isn't just
                encouraged — it's how we work.
              </p>
            </div>

            {/* Accountability */}
            <div className="p-6 rounded-[8px] border bg-white border-[#EBEBF0]">
              <div className="mb-6">
                <Image
                  src="/icons/growth.svg"
                  alt="Growth"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#121212]">Accountability</h3>
              <p className="text-gray-600 leading-relaxed">
                We own our outcomes. We take full responsibility for our words, our work, and our
                results. When we commit, we follow through. When we fall short, we own it and
                improve. Accountability is the foundation of the trust our clients and teammates
                place in us every day.
              </p>
            </div>

            {/* Leadership Mindset*/}
            <div className="p-6 rounded-[8px] bg-white border border-[#EBEBF0]">
              <div className="mb-6">
                <Image
                  src="/icons/professionalism.svg"
                  alt="Professionalism"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#121212]">Leadership Mindset</h3>
              <p className="text-gray-600 leading-relaxed">
                Lead from wherever you stand. Leadership isn't a title — it's a posture. We approach
                every task with initiative, foresight, and ownership. We don't wait for direction
                when we can create it. Every member of our team is expected to think like a leader
                and act with the confidence that drives progress.
              </p>
            </div>

            {/* Excellence */}
            <div className="p-6 rounded-[8px] border bg-white border-[#EBEBF0]">
              <div className="mb-6">
                <Image
                  src="/icons/consistency.svg"
                  alt="Consistency"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#121212]">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                Good enough never is. We set a high bar and hold ourselves to it — consistently.
                Excellence at AllTalentz means delivering work that is accurate, thoughtful, and
                built to last. We sweat the details, refine our process, and never mistake speed for
                quality.
              </p>
            </div>

            {/* Nobility */}
            <div className="p-6 rounded-[8px] border bg-white border-[#EBEBF0]">
              <div className="mb-6">
                <Image
                  src="/icons/integrity.svg"
                  alt="Integrity"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#121212]">Nobility</h3>
              <p className="text-gray-600 leading-relaxed">
                Do what's right, especially when it's hard. We act with integrity in every
                interaction — with clients, partners, and each other. Nobility means honesty over
                convenience, fairness over shortcuts, and respect as a non-negotiable. We build
                relationships that last because they are rooted in character.
              </p>
            </div>

            {/* Tenacity */}
            <div className="p-6 rounded-[8px] border bg-white border-[#EBEBF0]">
              <div className="mb-6">
                <Image
                  src="/icons/discipline.svg"
                  alt="Discipline"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#121212]">Tenacity</h3>
              <p className="text-gray-600 leading-relaxed">
                We don't quit when it gets hard. Challenges are not reasons to stop — they are
                reasons to adapt. We bring persistence, resilience, and a relentless focus on
                solutions to every obstacle we face. The harder the problem, the harder we work to
                solve it.
              </p>
            </div>

            {/* Zeal */}
            <div className="p-6 rounded-[8px] lg:col-start-2 border bg-white border-[#EBEBF0]">
              <div className="mb-6">
                <Image
                  src="/icons/discipline.svg"
                  alt="Discipline"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#121212]">Zeal</h3>
              <p className="text-gray-600 leading-relaxed">
                Passion in everything we do. We show up energized, engaged, and genuinely invested
                in the work. Zeal is what separates going through the motions from making a real
                impact. We bring enthusiasm to the grind, because we believe that what we do matters
                — and that belief drives everything.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Milestone (hidden on mobile) */}
      <div className="hidden md:block">
        <Milestone />
      </div>

      {/* Mobile Milestone (hidden on desktop) */}
      <div className="block md:hidden">
        <MobileMilestone />
      </div>

      <Team />

      <section className="px-[10px] md:px-0 bg-[#131313]">
        <MainFooter />
      </section>
    </main>
  );
}
