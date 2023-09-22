import Image from "next/image"
import Head from "next/head"
import Carousel from 'react-bootstrap/Carousel';
import { useState } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Badge, Stack } from "react-bootstrap";



export default function recipePage({recipe,instructions}){

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const tags =[
    {name: 'vegan', tagName:''},
    {name: 'glutenFree', tagName:''},
    {name: 'vegetarian', tagName:''},
    {name: 'veryHealthy', tagName:''},
    {name: 'cheap', tagName:''},
    {name: 'veryPopular', tagName:''},
    {name: 'sustainable', tagName:''}
  ]

  return(
    <main id="recipe-card" className="d-flex flex-column justify-content-center align-items-center">
      <Head>
        <title>{recipe?.title}</title>
      </Head>
      <h1 id="dish-name" className="mt-3">{recipe?.title}</h1>
      <Image
        src={recipe?.image}
        width={500}
        height={375}
        alt={recipe?.title}
        className="mt-3"
      />
      <Card id="basic-info"  className="mt-5">
        <ListGroup variant="flush">
          <ListGroup.Item>Reading in: {recipe?.readyInMinutes} mins</ListGroup.Item>
          <ListGroup.Item>Serving size: {recipe?.servings} portions</ListGroup.Item>
          <ListGroup.Item>Price per serving: ${recipe?.pricePerServing}</ListGroup.Item>
        </ListGroup>
      </Card>
      <Stack direction="horizontal" gap={2} id="tags" className="d-flex justify-content-center flex-wrap mt-3">
        {recipe?.vegan === true && <Badge bg="success">Vegan friendly!</Badge>}
        {recipe?.glutenFree === true && <Badge bg="success">Gluten Free!</Badge>}
        {recipe?.vegetarian === true && <Badge bg="success">Vegetarian friendly!</Badge>}
        {recipe?.veryHealthy === true && <Badge bg="success">Healthy Choice!</Badge>}
        {recipe?.cheap === true && <Badge bg="success">Cheap choice</Badge>}
        {recipe?.veryPopular === true && <Badge bg="success">Popular Choice</Badge>}
        {recipe?.sustainable === true && <Badge bg="success">Sustainability</Badge>}
      </Stack>
      <Carousel data-bs-theme="dark" indicators={false} activeIndex={index} onSelect={handleSelect} slide={false} interval={null}
id="steps" className="my-5">
        {instructions && instructions[0].steps.map((stage,idx) => (
          <Carousel.Item key={idx}>
            <h4>Step {stage.number}</h4>
            <h5>Step: </h5>
            <p>{stage.step}</p>
            <div id="ingredients-and-equipments">
              <div className="ingredients">
                {stage.ingredients.length !== 0 && <h4>Ingredients: </h4>}
                {stage.ingredients.map((ingredient,ingredientIdx) => (<h6 key={ingredientIdx}>{ingredient.name}</h6>))}
              </div>
              <div className="equipments">
                {stage.equipment.length !== 0 && <h4>Equipment: </h4>}
                {stage.equipment.length !== 0 && stage.equipment.map((tool,toolIdx) => (<h6 key={toolIdx}>{tool.name}</h6>))}
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </main>
  )

}

export async function getStaticPaths(){
  return{
    paths:[],
    fallback:true
  }
}

export async function getStaticProps({params: {id}}) {

  const resRecipe = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.apiKey}`)
  const resInstruction = await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${process.env.apiKey}`)
  const recipe = await resRecipe.json()
  const instructions = await resInstruction.json()

  return {
    props: {
      recipe,
      instructions
    }
  }
}
