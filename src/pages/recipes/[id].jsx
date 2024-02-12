import Image from "next/image"
import Head from "next/head"
import {useRouter} from "next/router"
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Badge, Stack } from "react-bootstrap";
import { useState } from "react";
import { getRecipe, getRecipeSteps } from "src/lib/getRecipe";
import tags from "src/data/TagChoice";
import parse from 'html-react-parser';
import { RecipeTab } from "src/components/RecipeTab";

export default function RecipePage({recipe ,instructions}){

  const router = useRouter()

  const [index, setIndex] = useState(0);

  const parseSummary = recipe?.summary || ''
  const parseInstruction = recipe?.instructions || ''
  const parsedSummary = parse(parseSummary)
  const parsedInstruction = parse(parseInstruction)

  const tabsContent = {
    parsedSummary: parsedSummary,
    parsedInstruction: parsedInstruction,
    readyInMinutes: recipe?.readyInMinutes,
    servings: recipe?.servings ,
    pricePerServing: recipe?.pricePerServing ,
    dishTypes: recipe?.dishTypes ,
    nutrition: recipe?.nutrition,
    ingredients: recipe?.extendedIngredients
  }


  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  console.log(instructions)

  if(router.isFallback) return <div id="main-page" className="text-center mt-3"><h3>Loading...</h3></div>

  return(
    <main id="recipe-card" className="d-flex flex-column justify-content-center align-items-center mt-4">
      <Head>
        <title>{recipe?.title}</title>
      </Head>
      <h2 id="dish-name" className="mt-3">{recipe?.title}</h2>
      <Image
        src={recipe?.image}
        width={500}
        height={375}
        alt={recipe?.title}
        className="mt-3"
      />
      <Stack direction="horizontal" gap={2} id="tags" className="d-flex justify-content-center flex-wrap my-3">
        {tags.map((tag,index) => {
          const name = tag.name
          const tagName = tag.tagName
          const status = recipe && recipe[`${name}`]

          return status && <Badge key={index} bg="success">{tagName}</Badge>
        }
        )}
      </Stack>
      <RecipeTab tabsContent={tabsContent}/>
      <Carousel data-bs-theme="dark" indicators={false} activeIndex={index} onSelect={handleSelect} slide={false} interval={null}
id="steps" className="my-5 d-flex justify-content-center">
        {instructions && instructions[0]?.steps?.map((stage,idx) => (
          <Carousel.Item key={idx}>
            <h3>Step {stage.number}</h3>
            <div id="ingredients-and-equipments" className="d-flex flex-column">
              {stage.ingredients.length !== 0 && <h4>Ingredients: </h4>}
              <div className="d-flex justify-content-start">
                {stage.ingredients.map((ingredient,ingredientIdx) => (
                  <div className="d-flex flex-column ingredients" key={ingredientIdx}>
                    <h6 >{ingredient.name}</h6>
                    <Image
                      src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                      alt={ingredient.name}
                      width={100}
                      height={100}
                    />
                  </div>
                ))}
              </div>
              {stage.equipment.length !== 0 && <h4>Equipment: </h4>}
              <div className="d-flex justify-content-start">
                {stage.equipment.map((tool,toolIdx) => (
                  <div className="d-flex flex-column equipment" key={toolIdx}>
                    <h6 >{tool.name}</h6>
                    <Image
                      src={`https://spoonacular.com/cdn/equipment_100x100/${tool.image}`}
                      alt={tool.name}
                      width={100}
                      height={100}
                    />
                  </div>
                ))}
              </div>
              <div id="steps">
                <h4>Instruction: </h4>
                <p>{stage.step}</p>
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

  const recipe = await getRecipe(id)
  const instructions = await getRecipeSteps(id)

  return {
    props: {
      recipe,
      instructions
    }
  }
}
