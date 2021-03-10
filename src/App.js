// import logo from './logo.svg'; 
import './App.css';

import { Container } from 'react-bootstrap';

import Header from './components/Header'; 
import Footer from './components/Footer';

import HomeScreen from './pages/HomeScreen'

function App() {
  return (
    <div>
      <Header />
      {/* py- = padding */}
      <main className = "py-5"> 
        <Container>
          <HomeScreen />
        </Container>
      </main>

      <Footer />
    </div>
  )
}

export default App;
