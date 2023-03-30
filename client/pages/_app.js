import '../styles/globals.css'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { StateContextProvider } from '../context'
import { MetaDetail, Footer, Navbar, Stats, Hero, EthDetail, Features } from "../components/login_components";
import styles from "../components/login_components/style";


export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider >

      <StateContextProvider>

        <Component {...pageProps} />


      </StateContextProvider>

    </ThirdwebProvider>
  );
}
