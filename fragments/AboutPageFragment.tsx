import Image from "next/image";
import Btn from "@/components/Btn";
import Milestone from "@/components/homeRD/Milestone";
import MobileMilestone from "@/components/homeRD/MobileMilestone";
import Team from "@/components/homeRD/Team";
import MainFooter from "@/components/MainFooter";
import PageHeader from "@/components/PageHeader";
import NicheSection from "@/components/homeRD/Niches";

export default function About() {
  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      <PageHeader about={true} showBg={false}>
        <div className="max-w-7xl mx-auto px-4 lg:flex relative h-[100%] items-center py-20">
          {/* Left Column */}
          <div className="lg:w-[45%] flex flex-col">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
              Scale Smarter with{" "}
              <span className="text-[#FFB300]">
                Pre-Trained
              </span>{" "}
              Remote Talent. 
            </h1>

            <p className="text-white text-lg md:text-xl font-light leading-relaxed max-w-xl">
              All Talentz is a remote staffing company connecting businesses with pre-vetted, industry-trained professionals. We place talents with precision and deploy with speed.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Btn text="Build Your Team" otherCSS="w-full text-center" link="/request-talent" />
              <Btn text="Talk to Our Team" otherCSS="w-full text-center" link="/contact-us" />
            </div>
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

      {/* Our Story */}
      <section className="relative bg-white py-20 px-4 bg-[url('/redesign-25/backgrounds/partners.svg')] bg-center bg-cover bg-no-repeat">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-black">Our Story</h2>
          <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed">
            <p>
              All Talentz was founded on a simple observation: the global talent gap is a
              distribution problem, not a supply problem.
            </p>
            <p>
              Africa has one of the fastest-growing professional workforces in the world — trained,
              ambitious, and largely untapped by the businesses that need them most. Meanwhile, U.S.
              companies in Healthcare, Technology, Finance, Construction, and Legal are spending too
              much, waiting too long, and still struggling to find the right people.
            </p>
            <p>
              We built All Talentz to close that gap. Not by sending businesses a list of résumés,
              but by matching them with professionals who are already trained for their industry,
              screened for their role, and ready to integrate within days.
            </p>
            <p>
              Today, All Talentz operates as a full-service remote staffing agency, placing talent,
              managing compliance, and providing ongoing operational support so that every engagement
              runs smoothly from day one.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative bg-white py-20 px-4 bg-[url('/redesign-25/backgrounds/partners.svg')] bg-center bg-cover bg-no-repeat">
        <div className="max-w-7xl mx-auto">
          {/* Mission */}
          <div className="mb-12">
            <Image
              src="/icons/target.svg"
              alt="Mission Target"
              width={64}
              height={64}
              className="w-16 h-16 mb-6"
            />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">Our Mission</h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Our mission is to build and deploy high-quality talent through structured assessments
              and global training, expanding our footprint to serve clients and professionals across
              the world.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-12" />

          {/* Vision */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">Our Vision</h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Restoring excellence globally through innovative outsourcing and transformative
              technology solutions.
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-[#F99621] rounded-xl p-4 md:p-8 text-white">
              <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">100+</div>
              <div className="text-sm md:text-xl">Clients</div>
            </div>
            <div className="bg-[#F99621] rounded-xl p-4 md:p-8 text-white">
              <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">50+</div>
              <div className="text-sm md:text-xl">Locations</div>
            </div>
            <div className="bg-[#F99621] rounded-xl p-4 md:p-8 text-white">
              <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">99%</div>
              <div className="text-sm md:text-xl">Positive feedbacks</div>
            </div>
            <div className="bg-[#F99621] rounded-xl p-4 md:p-8 text-white">
              <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">5000+</div>
              <div className="text-sm md:text-xl">Quality Professionals</div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-24 px-4  bg-[url('/redesign-25/backgrounds/frame-pattern-1.svg')] bg-center bg-cover bg-no-repeat">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <h2 className="text-4xl font-bold text-center mb-16 text-[#121212]">What We Stand For</h2>

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

      <NicheSection title="Industries We Serve" subtitle="We place trained, vetted professionals across five core verticals. Each practice is staffed by specialists, not generalists."/>

      <Team />

      {/* Certifications */}
      <section className="bg-[#0D0D0D] py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Certified. Compliant. Trusted.
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-16">
            Every engagement with All Talentz is backed by enterprise-grade compliance and data
            security protocols.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16">
            {/* ISO 27001 */}
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white rounded-2xl p-6 w-36 h-36 flex items-center justify-center">
                <Image
                  src="/certs/iso-badge.png"
                  alt="ISO 27001 Certified"
                  width={96}
                  height={96}
                  className="w-24 h-24 object-contain"
                />
              </div>
              <p className="text-white font-semibold text-sm tracking-wide">ISO 27001 Certified</p>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-24 bg-white/10" />

            {/* SOC-2 Type 2 */}
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white rounded-2xl p-6 w-36 h-36 flex items-center justify-center">
                <Image
                  src="/certs/AssurancePoint.png"
                  alt="SOC-2 Type 2 Certified"
                  width={96}
                  height={96}
                  className="w-24 h-24 object-contain"
                />
              </div>
              <p className="text-white font-semibold text-sm tracking-wide">SOC-2 Type 2 Certified</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[10px] md:px-0 bg-[#131313]">
        <MainFooter />
      </section>
    </main>
  );
}
