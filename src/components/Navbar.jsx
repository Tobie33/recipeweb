import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav';
import {useState} from 'react'


import 'bootstrap/dist/css/bootstrap.min.css';

export default function MainPageNavbar() {
  const [recipe, setRecipe] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <Navbar collapseOnSelect expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Spooncular</Navbar.Brand>
        <Navbar.Toggle aria-controls="collapsed-navbar" />
        <Navbar.Collapse id="collapsed-navbar" className='justify-content-end'>
          <Nav>
            <Nav.Item className='me-5'>
              <Nav.Link href="/recipes">Recipes</Nav.Link>
            </Nav.Item>
            </Nav>
            <Nav>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                placeholder="Recipe"
                className="me-2"
                aria-label="Query"
                onChange={(e) => setRecipe(e.target.value)}
              />
              <Link
              href={{
                pathname:'/recipes',
                query:{
                  query: recipe}
              }}>
                <Button
                  type="submit"
                  variant="outline-success"
                  id="navbar-button"
                >
                Search</Button>
              </Link>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
