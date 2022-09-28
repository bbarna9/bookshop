import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import ListGroup from 'react-bootstrap/ListGroup';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      // We are keeping the previous state values
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      // We are returning a new state by keeping the previous values and updating the
      // products coming from the action,
      return { ...state, book: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function BookScreen() {
  const params = useParams();
  const { key } = params;

  const [{ loading, error, book }, dispatch] = useReducer(reducer, {
    book: [],
    loading: true,
    error: '',
  });

  // In the next line we are using the "useState" function to save th books from the backend,
  // this function returns an array that contains a variable and a function to update that specific variable.

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/books/key/${key}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, [key]);

  return (
    <div>
      <Row>
        <Col md={5}>
          <img className="book-image" src={book.image} alt={book.name}></img>
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{book.title}</title>
              </Helmet>
              <h1>{book.title}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col className="lc">Szerző: </Col>
                <Col>{book.author}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col className="lc">Ár: </Col>
                <Col>{book.price} Ft</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col className="lc">Oldalszám: </Col>
                <Col>{book.page}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col className="lc">Kiadás éve: </Col>
                <Col>{book.release}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col className="lc">Leírás: </Col>
                <Col>{book.description}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col className="lc">Elérhetőség: </Col>
                <Col>
                  {book.stock > 0 ? (
                    <p className="a">Elérhető</p>
                  ) : (
                    <p className="na">Jelenleg nem elérhető.</p>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
            {book.stock > 0 && (
              <ListGroup.Item>
                <div>
                  <Button className="cartButton" variant="primary">
                    Kosárba
                  </Button>
                </div>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}
export default BookScreen;
