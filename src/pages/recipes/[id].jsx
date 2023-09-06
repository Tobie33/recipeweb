import Image from "next/image"
import Head from "next/head"
import Carousel from 'react-bootstrap/Carousel';
import { useState } from "react";


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
      <h1>{recipe?.title}</h1>
      <Image
        src={recipe?.image}
        width={500}
        height={375}
        alt={recipe?.title}
        className="mt-3"
      />
      <div id="basic info">
        <p>Reading in: {recipe?.readyInMinutes} mins</p>
        <p>Serving size: {recipe?.servings} portions</p>
        <p>Price per serving: ${recipe?.pricePerServing}</p>
      </div>
      <div id="tags" className="d-flex">
        {recipe?.vegan === true && <h3>Vegan friendly!</h3>}
        {recipe?.glutenFree === true && <h3>Gluten Free!</h3>}
        {recipe?.vegetarian === true && <h3>Vegetarian friendly!</h3>}
        {recipe?.veryHealthy === true && <h3>Healthy Choice!</h3>}
        {recipe?.cheap === true && <h3>Cheap choice</h3>}
        {recipe?.veryPopular === true && <h3>Popular Choice</h3>}
        {recipe?.sustainable === true && <h3>Sustainability</h3>}
      </div>
      <Carousel data-bs-theme="dark" indicators={false} activeIndex={index} onSelect={handleSelect} slide={false} interval={null}
id="steps">
        {instructions && instructions[0].steps.map((stage,idx) => (
          <Carousel.Item key={idx}>
            <h4>Step {stage.number}</h4>
            <h5>Step: </h5>
            <p>{stage.step}</p>
            {stage.ingredients.length !== 0 && <h5>Ingredients: </h5>}
            {stage.ingredients.map((ingredient,ingredientIdx) => (<h6 key={ingredientIdx}>{ingredient.name}</h6>))}
            {stage.equipment.length !== 0 && <h5>Equipment: </h5>}
            {stage.equipment.length !== 0 && stage.equipment.map((tool,toolIdx) => (<h6 key={toolIdx}>{tool.name}</h6>))}
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
