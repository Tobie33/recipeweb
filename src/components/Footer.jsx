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
      <div id="footer-links" className="d-flex align-items-center">
        <div className="d-flex">
          <h2>Credit for Spoonacular for the API: </h2><Link href="https://spoonacular.com/food-api" className="px-2 pt-1"><FontAwesomeIcon icon={faLayerGroup} size="xl" style={{color: "#ffffff",}}/></Link>
        </div>
        <div className="d-flex">
          <h2 className="ms-1">Github Depository:</h2><Link href="https://github.com/Tobie33/recipeweb" className="px-2 pt-1"><FontAwesomeIcon icon={faGithub} size="xl" style={{color: "#ffffff",}} /></Link>
        </div>
      </div>
    </footer>
  )
}
