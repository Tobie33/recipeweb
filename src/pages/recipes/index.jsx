import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function recipesSearchPage({recipes}){

  // TBD Show the query from searching on search bar
  const searchParams = useSearchParams()
  const search = searchParams.get('query')


  const [recipe, setRecipe] = useState(``)

  const handleSubmit = (event) => {
    event.preventDefault()

  }

  // console.log(recipe)
  return(
    <div id="main-page">
    <Row>
    <Form className="d-flex" onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        placeholder="Search"
        value={recipe}
        onChange={(e) => setRecipe(e.target.value)}
      />
      <Link
        href={{
          query:{
            query: recipe}
        }}>
        <Button
          type="submit"
          variant="outline-success"
        >
        Search</Button>
      </Link>
    </Form>
      <FloatingLabel controlId="floatingSelect" label="Works with selects">
        <Form.Select aria-label="Floating label select example">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </FloatingLabel>
    </Row>
    </div>
  )
}

export async function getServerSideProps({context}) {
  const router = useRouter()
  const { query } = router.query;
  console.log(context)

  const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.apiKey}`)
  const recipes = await res.json()

  return {
    props: {
      recipes
    }
  }

}
