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
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Header />
      {/* py- = padding */}
      <main className = "py-5"> 
        <Container>
          <Route path = '/' component = {HomePage} exact/>
          <Route path = '/login' component = {LoginPage} />
          {/* Render products by id */}
          <Route path = '/product/:id' component = {ProductPage} exact/>
          {/* ? makes the id optional */}
          <Route path = '/cart/:id?' component = {CartPage} exact />
        </Container>
      </main>

      <Footer />
    </Router>
  )
}

export default App;
