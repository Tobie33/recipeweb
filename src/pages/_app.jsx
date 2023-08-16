import MainPageNavbar from "../components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPageFooter from "src/components/Footer";

import '../styles/index.scss'




export default function MyApp({ Component, pageProps }) {
  return <>
    <MainPageNavbar />
    <Component {...pageProps} />
    <MainPageFooter/>
  </>
}
