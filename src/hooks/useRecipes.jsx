import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url) => axios.get(url).then(res => res.data)

const useRecipes = () => {
  const { data } = useSWR('https://api.spoonacular.com/recipes/complexSearch?apiKey=1bec639b796041aa9f9050c4836b248a', fetcher)
}

export default useRecipes
