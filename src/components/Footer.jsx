import Link from "next/link"

export default function MainPageFooter(){
  return(
    <footer className="d-flex flex-column align-items-center justify-content-center">
      <h3>The website is built on <Link href="https://spoonacular.com/food-api">Spoonacular API</Link></h3>
      <h3>Link to the repository</h3>
      <h4><Link href="https://github.com/Tobie33/recipeweb">Tobie33</Link></h4>
    </footer>
  )
}
