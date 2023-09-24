export async function getRandomRecipes(){

  const res = await fetch(`https://api.spoonacular.com/recipes/random?number=8&apiKey=${process.env.RECIPE_KEY}`)
  const data = await res.json()

  return data
}

export async function getQueriedRecipes({query:{query, diet, cuisine}}, recipesPerPage, offset){

  const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.RECIPE_KEY}&query=${query}&addRecipeInformation=true&diet=${diet}&cuisine=${cuisine}&number=${recipesPerPage}&offset=${offset}`)

  const data = await res.json()

  return data
}
