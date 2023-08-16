import Image from "next/image"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


export default function mainPage({ recipes: { results } }) {

  return (
    <main id="main-page">
      <section className="pages text-center d-flex flex-column justify-content-center align-items-center">
        <h1>Spoonacular</h1>
        <h2 className="mt-5">Find all your favourite recipes from around the world</h2>
      </section>
      <section className="pages" id="image-pages">
        <Row className=" image-block d-flex justify-content-center m-0">
          {results && results.map(recipe => (
            <Col
              xxl={3}
              xl={4}
              md={6}
              sm={12}
              key={recipe.id}
              className="recipe-block d-flex justify-content-center"
            >
              <Image
                src={recipe.image}
                width={275}
                height={200}
                alt={recipe.title}
              />
            </Col>
          ))}
        </Row>
      </section>
    </main>
  )
}

export async function getStaticProps() {
  const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.apiKey}`)
  const recipes = await res.json()

  return {
    props: {
      recipes
    }
  }

}
