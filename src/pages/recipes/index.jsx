import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head'
import Router from 'next/router'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
import { useState } from 'react';
import React from 'react';
import { getQueriedRecipes } from 'src/lib/getRecipes';
import SearchBarAndFilters from 'src/components/SearchBarAndFilters';

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

  const handleSubmit = (event) => {
    event.preventDefault()

  }

  return(
    <div id="main-page">
      <Head>
        <title>Search Page</title>
      </Head>
      <SearchBarAndFilters recipe={recipe} setRecipe={setRecipe} diet={diet} setDiet={setDietValue} cuisine={cuisine} setCuisine={setCuisineValue} search={search} setSearch={setSearch}/>
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
                <Card.Header className="text-center topic" as="h5">{recipe.title}</Card.Header>
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
