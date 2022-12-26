
import styles, { layout } from "./style";

import Image from 'next/image'
import ether from "../../public/ethereum-2879620.png"


const EthDetail = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Fully deployed on decentralized <br className="sm:block hidden" /> Ethereum mainnet.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Arcu tortor, purus in mattis at sed integer faucibus. Aliquet quis
        aliquet eget mauris tortor.ç Aliquet ultrices ac, ametau.
      </p>

    </div>

    <div className={layout.sectionImg}>
      <Image priority={true} src={ether} alt="billing" className="w-[60%] h-[100%]" />
      {/* <Image src={blockchain} alt="billing" className="w-[100%] h-[100%]" /> */}
      <div className="absolute z-[0] w-[40%] h-[20%] top-0 pink__gradient" />
      <div className="absolute z-[1] w-[80%] h-[40%] rounded-full white__gradient bottom-40" />
      <div className="absolute z-[0] w-[50%] h-[25%] right-20 bottom-20 blue__gradient" />
    </div>
  </section>
);

export default EthDetail;
