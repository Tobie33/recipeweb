export async function getRecipe(id){

  const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.apiKey}`)
  const data = await res.json()

  return data
}

export async function getRecipeSteps(id){

  const res = await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${process.env.apiKey}`)
  const data = await res.json()

  return data
}
