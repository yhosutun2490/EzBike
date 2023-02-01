import "../styles/globals.css";
import { BikesDataProvider } from "../context/BikesContext";
import { GeoLocationProvider } from "../context/GeoLocationContext";
import { QueryClient, QueryClientProvider } from "react-query";

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <GeoLocationProvider>
      <QueryClientProvider client={queryClient}>
        <BikesDataProvider>
          <Component {...pageProps} />
        </BikesDataProvider>
      </QueryClientProvider>
    </GeoLocationProvider>
  );
}
