import '../styles/globals.css'
import { BikesDataProvider } from '../context/bikesContext'

export default function App({ Component, pageProps }) {
  return (
  <BikesDataProvider>
     <Component {...pageProps} />
  </BikesDataProvider>
  )
}
