import '../styles/globals.css'
import { StateContextProvider } from '../context'
import { MetaDetail, Footer, Navbar, Stats, Hero, EthDetail, Features } from "../components/login_components";
import styles from "../components/login_components/style";
import dynamic from "next/dynamic";
// const NoSSRHeader = dynamic(() => import("../components/login_components/"), {
//   ssr: false,
// });
const isServer = () => typeof window === 'undefined';
import NonSSRWrapper from '../components/NoSSR';


export default function App({ Component, pageProps }) {
  return (

    <NonSSRWrapper>

      <StateContextProvider>
        <div className={`bg-primary bg-[#01040f] ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>

        <Component {...pageProps} />

        <div className={`bg-primary bg-[#01040f] ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Footer />
          </div>
        </div>


      </StateContextProvider>
    </NonSSRWrapper>


  );
}
