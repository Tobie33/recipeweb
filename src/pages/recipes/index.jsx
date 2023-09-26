import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head'
import Router from 'next/router'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
import { useState } from 'react';
import React from 'react';
import { getQueriedRecipes } from 'src/lib/getRecipes';


export default function RecipesSearchPage({recipes :{results}}){

  const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
      const start = () => {
        console.log("start");
        setLoading(true);
      };
      const end = () => {
        console.log("finished");
        setLoading(false);
      };
      Router.events.on("routeChangeStart", start);
      Router.events.on("routeChangeComplete", end);
      Router.events.on("routeChangeError", end);
      return () => {
        Router.events.off("routeChangeStart", start);
        Router.events.off("routeChangeComplete", end);
        Router.events.off("routeChangeError", end);
      };
    }, []);



  const [recipe, setRecipe] = useState(``)
  const [diet, setDietValue] = useState(``)
  const [cuisine, setCuisineValue] = useState(``)
  const [page,setPage] = useState(1)
  //check if user has performed a search
  const [search,setSearch] = useState(false)

  // The diet and cuisine options since there's no API to grab all the options available
  const diets = [
    {name: 'Select a diet', value: 0},
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
    {name:'Select a cuisine'},
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
      <Row id="search-and-filter" className='m-0'>
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <div id="query" className='d-flex mt-3'>
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
                  diet,
                  cuisine,
                  }
              }}>
                <Button
                  type="submit"
                  variant="outline-success"
                  onClick={() => setSearch(search === false ? true : true)}
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
      {results &&
        <div id="prev-and-next-button" className='mb-3'>
          {!(page === 1) &&
            <Link
              href={{
                query:{
                  query: recipe,
                  diet,
                  cuisine,
                  page: page - 1
                }
              }}>
              <Button variant="outline-success" type="submit" className='page-buttons' onClick={() => setPage(page - 1)}>
                Prev
              </Button>
            </Link>
          }
          { !(results?.length < 24) &&
            <Link
              href={{
                query:{
                  query: recipe,
                  diet,
                  cuisine,
                  page: page + 1
                }
              }}>
              <Button variant="outline-success" type="submit" id="next-button" className='page-buttons' onClick={() => setPage(page + 1)}>
                Next
              </Button>
            </Link>
          }
        </div>
      }
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
                <Card.Body className='d-flex justify-content-center al'>
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
        ))
        }
        {
          loading ?
          <div id="loading-page" className='text-center'>
            <h3>Loading...</h3>
          </div>
          :
        (results?.length === 0 && search === true) &&
          <div id="not-found-page" className='text-center'>
            <h3>Results not found! Try again</h3>
          </div>
        }
      </Row>
    </div>
  )
}

export async function getServerSideProps({query}) {

  //adjustable to show more or less recipes in each page

  const page = query.page
  const recipesPerPage = 24
  let number = 0
  number = page ?  recipesPerPage * page : 24

  const offset = (number / recipesPerPage -1) * recipesPerPage

  const recipes = await getQueriedRecipes({query},recipesPerPage,offset)

  return {
    props: {
      recipes
    }
  }

}
