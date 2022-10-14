import { useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Book from '../components/Book';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      // We are keeping the previous state values
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      // We are returning a new state by keeping the previous values and updating the
      // products coming from the action,
      return { ...state, books: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  // Dispatch is to update the state
  const [{ loading, error, books }, dispatch] = useReducer(logger(reducer), {
    books: [],
    loading: true,
    error: '',
  });

  // In the next line we are using the "useState" function to save th books from the backend,
  // this function returns an array that contains a variable and a function to update that specific variable.

  // const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/books');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
      // setBooks(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Fellegvár Könyvesbolt</title>
      </Helmet>
      <h1>Metro sorozat</h1>
      <div className="metroSeries">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {books.map((book) => (
              <Col key={book.key} sm={6} md={4} lg={3}>
                <Book book={book}></Book>
              </Col>
            ))}
          </Row>
        )}{' '}
      </div>
    </div>
  );
}
export default HomeScreen;
