import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartEvent = async (book, quantity) => {
    const { data } = await axios.get(`/api/books/${book._id}`);
    if (data.stock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'ADD_TO_CART',
      payload: { ...book, quantity },
    });
  };

  const removeBookEvent = (book) => {
    ctxDispatch({ type: 'BOOK_CART_REMOVE', payload: book });
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div>
      <Helmet>
        <title>Kosár</title>
      </Helmet>
      <h1>Kosár</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              A kosár üres. <Link to="/">Vásárlás folytatása</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((book) => (
                <ListGroup.Item key={book._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={book.image}
                        alt={book.title}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/book/${book.key}`}>{book.title}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        onClick={() => updateCartEvent(book, book.quantity - 1)}
                        disabled={book.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{book.quantity}</span>{' '}
                      <Button
                        variant="light"
                        onClick={() => updateCartEvent(book, book.quantity + 1)}
                        disabled={book.quantity === book.stock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>{book.price} Ft</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => removeBookEvent(book)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Összesen:{' '}
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} Ft
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Tovább a szállításhoz
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
