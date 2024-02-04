export async function getRecipe(id){

  const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${process.env.RECIPE_KEY}`)
  const data = await res.json()

  return data
}

export async function getRecipeSteps(id){

  const res = await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${process.env.RECIPE_KEY}`)
  const data = await res.json()

  return data
}
