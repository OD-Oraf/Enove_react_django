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
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';


function App() {
  return (
    <Router>
      <Header />
      {/* py- = padding */}
      <main className = "py-5"> 
        <Container>
          <Route path = '/' component = {HomePage} exact/>
          <Route path = '/login' component = {LoginPage} />
          <Route path = '/register' component = {RegisterPage} />
          <Route path = '/profile' component = {ProfilePage} />
          <Route path = '/shipping' component = {ShippingPage} />
          <Route path = '/payment' component = {PaymentPage} />
          <Route path = '/placeorder' component = {PlaceOrderPage} />
          <Route path = '/order/:id' component = {OrderPage} />
          {/* Render products by id */}
          <Route path = '/product/:id' component = {ProductPage} exact/>
          {/* ? makes the id optional */}
          <Route path = '/cart/:id?' component = {CartPage} exact />


          <Route path = '/admin/userList' component = {UserListPage} />
          <Route path = '/admin/user/:id/edit' component = {UserEditPage} />

          <Route path = '/admin/productList' component = {ProductListPage} />
          <Route path = '/admin/product/:id/edit' component = {ProductEditPage} />



        </Container>
      </main>

      <Footer />
    </Router>
  )
}

export default App;
