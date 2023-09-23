import MainPageNavbar from "../components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPageFooter from "src/components/Footer";


import '../styles/global.scss'
import '../styles/recipes.scss'
import '../styles/recipe.scss'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <MainPageNavbar />
        <Component {...pageProps} />
      <MainPageFooter/>
    </>
  )
}
