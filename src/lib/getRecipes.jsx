// the api changed from random recipes to static recipes since not all of them have pictures

export async function getRecipesForFrontPage(){

  const res = await fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=1,2,3,4,5,6,7,8,9&apiKey=${process.env.RECIPE_KEY}`)
  const data = await res.json()

  return data
}

export async function getQueriedRecipes({query:{query, diet, cuisine}}, recipesPerPage, offset){

  const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.RECIPE_KEY}&query=${query}&addRecipeInformation=true&diet=${diet}&cuisine=${cuisine}&number=${recipesPerPage}&offset=${offset}`)

  const data = await res.json()

  return data
}
