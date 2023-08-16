import { useParams } from 'next/navigation'

export default function recipePage({recipe}){
  return(
    <h1>{recipe?.title}</h1>
  )

}

export async function getStaticPaths(){
  return{
    paths:[],
    fallback:true
  }
}

export async function getStaticProps({params: {id}}) {

  const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.apiKey}`)
  const recipe = await res.json()

  return {
    props: {
      recipe
    }
  }
}
