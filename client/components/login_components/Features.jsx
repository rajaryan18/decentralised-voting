import { features } from "../constants";
import styles, { layout } from "./style";

import Image from 'next/image'

const FeatureCard = ({ icon, title, content, index }) => (
  <div className={`flex flex-row px-6 py-2 md:py-4 lg:py-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <Image priority={true} src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-white/75 text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const Features = () => (
  <section id="features" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        You do the voting, <br className="sm:block hidden" /> we’ll handle the security.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-6`}>
        Occaecat culpa culpa id irure do et sint in ex cillum.Occaecat culpa culpa id irure do et sint in ex cillum.Occaecat culpa culpa id irure do et sint in ex cillum.
      </p>


    </div>

    <div className={`${layout.sectionImg} flex-col mb-6 mt-2`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default Features;
