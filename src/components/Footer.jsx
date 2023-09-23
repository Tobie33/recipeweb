import Link from "next/link"
import { Form } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons"


export default function MainPageFooter(){
  const [recipe, setRecipe] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return(
    <footer className="d-flex align-items-center justify-content-around">
      <div id="footer-links" className="d-flex flex-column align-items-center">
        <Link href="/">Spoonacular</Link>
        <Link href="/recipes">Recipes</Link>
        <div id="icons" className="d-flex">
          <Link href="https://spoonacular.com/food-api" className="px-2"><FontAwesomeIcon icon={faLayerGroup} size="xl" style={{color: "#000000",}} /></Link>
          <Link href="https://github.com/Tobie33/recipeweb" className="px-2"><FontAwesomeIcon icon={faGithub} size="xl" style={{color: "#3d6151",}} /></Link>
        </div>
      </div>
      <Form id="footer-search-bar" className="d-flex" onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Recipe"
          className="me-2"
          aria-label="Query"
          onChange={(e) => setRecipe(e.target.value)}
        />
        <Link
        href={{
          pathname:'/recipes',
          query:{
            query: recipe}
        }}>
          <Button
            type="submit"
            variant="outline-success"
            id="search-button"
          >
          Search</Button>
        </Link>
      </Form>
    </footer>
  )
}
