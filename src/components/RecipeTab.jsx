import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import DataTable from 'react-data-table-component';
import Accordion from 'react-bootstrap/Accordion';
import { NutrientTable } from 'src/data/NutrientTable';

export const RecipeTab = ({tabsContent:{parsedSummary, parsedInstruction, readyInMinutes, servings, pricePerServing, dishTypes, ingredients
, nutrition:{weightPerServing, caloricBreakdown, flavonoids, nutrients}}}) => {

  console.log(ingredients)

  const ingredientColumns = [
    {
      name:'Ingredient',
      selector: row => row.ingredient,
      sortable: true
    },
    {
      name:'Amount',
      selector: row => row.amount,
      sortable: true
    }
  ]

  const ingredientData = [
    ingredients.map(ingredient => (
      {
        ingredient: ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1),
        amount: ingredient.amount,
      }
    ))
  ]

  const servingColumns = [
    {
      name:'Nutrient',
      selector: row => row.name,
      sortable: true
    },
    {
      name:'Per Serving',
      selector: row => row.serving,
      sortable: true
    }
  ]

  const servingData = [
    Object.values(caloricBreakdown)?.map((nutrient,index) => {
      const nutritionList = [
        'Carbohydrates', 'Fat', 'Protein'
      ]
      return(
        {
          name: nutritionList[index],
          serving: nutrient
        }
      )
    })
  ]

  const nutrientsColumns = [
    {
      name:'Nutrients',
      selector: row => row.name,
      sortable:true
    },
    {
      name: 'Amount',
      selector: row => row.amount,
    },
    {
      name: 'Daily Amount Needed',
      selector: row => row.dailyNeeds,
      sortable:true
    }
  ]

  const nutrientsData = [
    nutrients.map(nutrient => (
      {
        name: nutrient.name,
        amount: nutrient.amount + nutrient.unit,
        dailyNeeds: nutrient.percentOfDailyNeeds
      }
    ))
  ]

  return (
    <Tabs
      defaultActiveKey="general"
      id="justify-tab"
      className="mb-3"
      justify
    >
      <Tab eventKey="general" title="General">
        <Card className="mt-3 basic-info">
          <ListGroup variant="flush">
            <ListGroup.Item>Reading in: {readyInMinutes} mins</ListGroup.Item>
            <ListGroup.Item>Serving size: {servings} portions</ListGroup.Item>
            <ListGroup.Item>Price per serving: ${pricePerServing}</ListGroup.Item>
            <ListGroup.Item>Suitable for: {dishTypes.map(dishType => (
              `${dishType} `
            ))}</ListGroup.Item>
            <ListGroup.Item>Weight Per Serving: {weightPerServing.amount}{weightPerServing.unit}</ListGroup.Item>
          </ListGroup>
        </Card>
      </Tab>
      <Tab eventKey="summary" title="Summary">
        <div className='mt-3'>
          {parsedSummary}
        </div>
      </Tab>
      <Tab eventKey="nutrition" title="Nutrition">
        <Card className="mt-3 basic-info">
          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Nutrients Per Serving</Accordion.Header>
              <Accordion.Body>
                <DataTable
                  columns={servingColumns}
                  data={servingData[0]}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Nutrients</Accordion.Header>
              <Accordion.Body>
                <DataTable
                  columns={nutrientsColumns}
                  data={nutrientsData[0]}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card>
      </Tab>
      <Tab eventKey="ingredients" title="Ingredients">
        <div className='mt-3'>
          {parsedInstruction}
        </div>
        <Card className="mt-3 basic-info">
          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Ingredients Needed</Accordion.Header>
              <Accordion.Body>
                <DataTable
                  columns={ingredientColumns}
                  data={ingredientData[0]}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card>
      </Tab>
    </Tabs>
  );
}
