import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Book(props) {
  const { book } = props;
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
      <Button id="addToCartButton">Kosárba</Button>
    </Card>
  );
}
export default Book;
