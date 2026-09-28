import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="app-header">
          <div class="logo">
            <a href="#home">
              <img src="/images/Logo.svg" alt="logo" />
            </a>
          </div>
          <nav>
            <ul class="nav-links">
              <li><Link to="/" style={{ marginRight: '10px' }}>Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#reservations">Reservations</a></li>
              <li><a href="#order-online">Order Online</a></li>
              <li><a href="#login">Login</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer>The footer</footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
