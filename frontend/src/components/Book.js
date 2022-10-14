import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import { useContext } from 'react';

function Book(props) {
  const { book } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartEvent = async (item) => {
    const existItem = cartItems.find((x) => x._id === book._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/books/${item._id}`);
    if (data.stock < quantity) {
      window.alert('Jelenleg nem elérhető.');
      return;
    }
    ctxDispatch({
      type: 'ADD_TO_CART',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="book">
      <Link to={`/book/${book.key}`}>
        <img src={book.image} alt={book.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link calssName="link" to={`/book/${book.key}`}>
          <Card.Title>{book.title}</Card.Title>
        </Link>
      </Card.Body>
      <Card.Text>Ár: {book.price} Ft</Card.Text>
      {book.stock === 0 ? (
        <Button variant="light" disabled>
          Nincs készleten
        </Button>
      ) : (
        <Button id="addToCartButton" onClick={() => addToCartEvent(book)}>
          Kosárba
        </Button>
      )}
    </Card>
  );
}
export default Book;
