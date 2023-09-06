import MainPageNavbar from "../components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPageFooter from "src/components/Footer";

import '../styles/main_page.scss'
import '../styles/recipes.scss'
import '../styles/recipe.scss'

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <MainPageNavbar />
        <Component {...pageProps} />
      <MainPageFooter/>
    </>
  )
}
