import "../styles/globals.css";
import { BikesDataProvider } from "../context/BikesContext";
import { GeoLocationProvider } from "../context/GeoLocationContext";

export default function App({ Component, pageProps }) {
  return (
    <GeoLocationProvider>
      <BikesDataProvider>
        <Component {...pageProps} />
      </BikesDataProvider>
    </GeoLocationProvider>
  );
}
