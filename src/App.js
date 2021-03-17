// import logo from './logo.svg'; 
import './App.css';
// React imports
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Route } from 'react-router-dom'; 

// Components
import Header from './components/Header'; 
import Footer from './components/Footer';

// Page Components
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <Router>
      <Header />
      {/* py- = padding */}
      <main className = "py-5"> 
        <Container>
          <Route path = '/' component = {HomePage} exact/>
          {/* Render products by id */}
          <Route path = '/product/:id' component = {ProductPage} exact/>
        </Container>
      </main>

      <Footer />
    </Router>
  )
}

export default App;
