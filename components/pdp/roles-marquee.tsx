import Image from "next/image";

/**
 * Orange band under the PDP hero that scrolls the roles the programme trains
 * for. The list is duplicated by the caller's data (last entry repeats the
 * first) so the marquee reads continuously.
 */
type RolesMarqueeProps = {
  roles: string[];
};

const RolesMarquee = ({ roles }: RolesMarqueeProps) => (
  <div className="bg-[#F99621] py-8 overflow-hidden">
    <div className="flex animate-marquee whitespace-nowrap">
      {roles.map((role, index) => (
        <div key={`${role}-${index}`} className="flex items-center mx-4 text-white font-bold text-2xl">
          <span className="mr-2">
            <Image src="/redesign-25/icons/stars.svg" alt="" width={25} height={25} />
          </span>
          {role}
          <span className="ml-2">
            <Image src="/redesign-25/icons/stars.svg" alt="" width={25} height={25} />
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default RolesMarquee;
