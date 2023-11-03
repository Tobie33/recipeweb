import Link from 'next/link';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
import React from 'react';
import diets from 'src/data/DietChoice';
import cuisines from 'src/data/CuisineChoice';

export default function SearchBarAndFilters({recipe, setRecipe, diet, setDiet, cuisine, setCuisine, search, setSearch}){

  return(
    <Row id="search-and-filter" className='m-0'>
        <Form className="d-flex flex-column" onSubmit={(e)=> e.preventDefault()}>
          <div id="query" className='d-flex mt-3'>
            <Form.Control
              type="text"
              placeholder="Search"
              value={recipe}
              onChange={(e) => setRecipe(e.target.value)}
            />
            <Link
              href={{
                query:{
                  query: recipe,
                  diet,
                  cuisine,
                  }
              }}>
                <Button
                  type="submit"
                  variant="outline-success"
                  onClick={() => setSearch(search === false ? true : true)}
                >
                Search</Button>
            </Link>
          </div>
          <Row id="choices" className='d-flex justify-content-around'>
            <Col xl ={6} xs={12} >
              <FloatingLabel controlId="diets" label="Diet Choices" className='my-3'>
                <Form.Select
                  onChange={(e) => setDiet(e.target.value)}
                  aria-label="Floating label for diets">
                  {diets.map((dietary,index) => (
                    <option
                      key={index}
                      id={`dietary-${index}`}
                      value={dietary.name}
                    >
                    {dietary.name}
                    </option>
                  ))}
                  </Form.Select>
              </FloatingLabel>
            </Col>
            <Col xl ={6} xs={12} >
              <FloatingLabel controlId="cuisine" label="Cuisine Choices" className='my-3'>
                <Form.Select
                  onChange={(e) => setCuisine(e.target.value)}
                  aria-label="Floating label for cuisines">
                  {cuisines.map((cuisineChoice,index) => (
                    <option
                      key={index}
                      id={`cuisineChoice-${index}`}
                      value={cuisineChoice.name}
                    >
                    {cuisineChoice.name}
                    </option>
                  ))}
                  </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
        </Form>
      </Row>
  )
}
