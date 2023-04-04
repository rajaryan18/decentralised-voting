
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

    </div>
  </section>
);

export default EthDetail;
