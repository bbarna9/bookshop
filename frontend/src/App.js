import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BookScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar background="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Fellegvár</Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/book/:key" element={<BookScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="footer">Ez egy webshop</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
