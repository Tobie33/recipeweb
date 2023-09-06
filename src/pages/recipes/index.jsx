import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import Col from 'react-bootstrap/Col';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Head from 'next/head'






export default function recipesSearchPage({recipes :{results}}){

  // TBD Show the query from searching on search bar
  // const searchParams = useSearchParams()
  // const search = searchParams.get('query')


  const [recipe, setRecipe] = useState(``)
  const [diet, setDietValue] = useState(``)
  const [cuisine, setCuisineValue] = useState(``)


  console.log(diet,cuisine)

  const diets = [
    {name: 'Gluten Free', value: 1},
    {name: 'Ketogenic', value: 2},
    {name: 'Vegetarian', value: 3},
    {name: 'Lacto-Vegetarian', value: 4},
    {name: 'Ovo-Vegetarian', value: 5},
    {name: 'Vegan', value: 6},
    {name: 'Pescetarian', value: 7},
    {name: 'Paleo', value: 8},
    {name: 'Primal', value: 9},
    {name: 'Low FODMAP', value: 10},
    {name: 'Whole30', value:11}
  ]

  const cuisines = [
    {name:'African'},
    {name:'Asian'},
    {name:'American'},
    {name:'British'},
    {name:'Cajun'},
    {name:'Caribbean'},
    {name:'Chinese'},
    {name:'Eastern European'},
    {name:'European'},
    {name:'French'},
    {name:'German'},
    {name:'Greek'},
    {name:'Indian'},
    {name:'Irish'},
    {name:'Italian'},
    {name:'Japanese'},
    {name:'Jewish'},
    {name:'Korean'},
    {name:'Latin American'},
    {name:'Mediterranean'},
    {name:'Mexican'},
    {name:'Middle Eastern'},
    {name:'Nordic'},
    {name:'Southern'},
    {name:'Spanish'},
    {name:'Thai'},
    {name:'Vietnamese'}
  ]

  const handleSubmit = (event) => {
    event.preventDefault()

  }

  return(
    <div id="main-page">
      <Head>
        <title>Search Page</title>
      </Head>
      <Row id="search-and-filter">
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <div id="query" className='d-flex'>
            <Form.Control
              type="text"
              placeholder="Search"
              value={recipe}
              onChange={(e) => setRecipe(e.target.value)}
            />
            <Link
              href={{
                query:{
                  query: recipe,
                  diet: diet,
                  cuisine: cuisine
                  }
              }}>
                <Button
                  type="submit"
                  variant="outline-success"
                >
                Search</Button>
            </Link>
          </div>
          <Row id="choices" className='d-flex justify-content-around'>
          <Col xl ={6} xs={12} >
            <FloatingLabel controlId="diets" label="Diet Choices" className='my-3'>
              <Form.Select
                onChange={(e) => setDietValue(e.target.value)}
                aria-label="Floating label for diets">
                {diets.map((dietary,index) => (
                  <option
                    key={index}
                    id={`dietary-${index}`}
                    value={dietary.name}
                  >
                  {dietary.name}
                  </option>
                ))}
                </Form.Select>
            </FloatingLabel>
          </Col>
          <Col xl ={6} xs={12} >
            <FloatingLabel controlId="cuisine" label="Cuisine Choices" className='my-3'>
              <Form.Select
                onChange={(e) => setCuisineValue(e.target.value)}
                aria-label="Floating label for cuisines">
                {cuisines.map((cuisineChoice,index) => (
                  <option
                    key={index}
                    id={`cuisineChoice-${index}`}
                    value={cuisineChoice.name}
                  >
                  {cuisineChoice.name}
                  </option>
                ))}
                </Form.Select>
            </FloatingLabel>
          </Col>
          </Row>
        </Form>
      </Row>
      <Row id="recipes">
        {results?.map(recipe => (
          <Col
            xl={3}
            lg={4}
            md={6}
            sm={12}
            key={recipe.id}
            className="recipe-card"
          >
            <Link href={`/recipes/${recipe.id}`}>
              <Card>
                <Card.Header className="text-center" as="h5">{recipe.title}</Card.Header>
                <Card.Body className='d-flex justify-content-center'>
                  <Image
                    src={recipe.image}
                    width={250}
                    height={200}
                    alt={recipe.title}
                  />
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export async function getServerSideProps({query:{query, diet, cuisine}}) {

  const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.apiKey}&query=${query}&addRecipeInformation	=true&diet=${diet}&cuisine=${cuisine}`)
  const recipes = await res.json()

  return {
    props: {
      recipes
    }
  }

}


recipesSearchPage.getLayout = (page) => {
  return <SearchPageFilterBar>{page}</SearchPageFilterBar>
}
