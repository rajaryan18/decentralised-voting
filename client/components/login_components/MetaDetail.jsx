import Head from 'next/head'
import Image from 'next/image'
import { bill } from "../../public/assets";
import styles, { layout } from "./style";
import meta from "../../public/metamask.png"


const MetaDetail = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <Image priority={true} src={meta} alt="billing" className="w-[50%] lg:w-[60%] h-[100%] relative z-[5] mb-6" />
      {/* <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" /> */}
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Easily connect with your <br className="sm:block hidden" /> Metamask Wallet
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Elit enim sed massa etiam. Mauris eu adipiscing ultrices ametodio
        aenean neque. Fusce ipsum orci rhoncus aliporttitor integer platea
        placerat.
      </p>


    </div>
  </section>
);

export default MetaDetail;
