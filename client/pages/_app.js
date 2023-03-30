import '../styles/globals.css'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { StateContextProvider } from '../context'

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider >

      <StateContextProvider>
        <Component {...pageProps} />
      </StateContextProvider>

    </ThirdwebProvider>
  );
}
