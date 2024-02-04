import Image from "next/image"
import Head from "next/head"
import Link from "next/link"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { getRecipesForFrontPage } from "src/lib/getRecipes"

export default function MainPage({recipes}) {

  return (
    <main id="main-page">
      <Head>
        <title>Main Page</title>
      </Head>
      <section id="topic-page" className="text-center d-flex flex-column justify-content-center align-items-center">
        <div id="title-box">
          <h2 className="mt-5 topic main-page-topic">Find all your favourite recipes from around the world</h2>
        </div>
      </section>
      <section className="pages mt-5" id="image-pages">
        <Row className=" image-block d-flex justify-content-center m-0">
          {recipes && recipes.map(recipe => (
            <Col
              xxl={3}
              xl={4}
              md={6}
              sm={12}
              key={recipe.id}
              className="recipe-block d-flex justify-content-center fade-in-image"
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

  const recipes = await getRecipesForFrontPage()

  return {
    props: {
      recipes
    }
  }

}
