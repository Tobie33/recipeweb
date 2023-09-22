import Image from "next/image"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Head from "next/head"
import Link from "next/link"

export default function mainPage({recipes: {recipes}}) {

  return (
    <main id="main-page">
    <Head>
      <title>Main Page</title>
    </Head>
      <section className="pages text-center d-flex flex-column justify-content-center align-items-center">
        <h1>Spoonacular</h1>
        <h2 className="mt-5">Find all your favourite recipes from around the world</h2>
      </section>
      <section className="pages" id="image-pages">
        <Row className=" image-block d-flex justify-content-center m-0">
          {recipes && recipes.map(recipe => (
            <Col
              xxl={3}
              xl={4}
              md={6}
              sm={12}
              key={recipe.id}
              className="recipe-block d-flex justify-content-center"
            >
            <Link href={`recipes/${recipe.id}`}>
              <Image
                src={recipe.image}
                width={250}
                height={200}
                alt={recipe.title}
              />
            </Link>
            </Col>
          ))}
        </Row>
      </section>
    </main>
  )
}

export async function getStaticProps() {
  const res = await fetch(`https://api.spoonacular.com/recipes/random?number=8&apiKey=${process.env.apiKey}`)
  const recipes = await res.json()


  return {
    props: {
      recipes
    }
  }

}
