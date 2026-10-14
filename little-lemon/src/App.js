import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router";
//import {BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import BookingForm from './pages/BookingForm';
import { useReducer } from 'react';

function App() {
  function updateTimes(state, action) {
    console.log('reducer state:', state);
    console.log('reducer action:', action);
    var newArray = state.availableTimes;
    newArray.shift();
    console.log('reducer newArray:', newArray);
    return { availableTimes: newArray }
  }

  let intialAvailableTimes = ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

  function initializeTimes() {
    return intialAvailableTimes;
  }

  const [availableTimeState, availableTimeDispatch] = useReducer(updateTimes,
    { availableTimes: initializeTimes() });

  const atReducer = {
    availableTimeState: availableTimeState,
    availableTimeDispatch: availableTimeDispatch
  };

  return (
    <div class="app">
      <BrowserRouter>
        <header class="app-header">
          <div class="app-logo">
            <a href="#home">
              <img src="/images/Logo.svg" alt="logo" />
            </a>
          </div>
          <nav>
            <ul class="nav-links">
              <li>
                <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li><a href="#menu">Menu</a></li>
              <li>
                <Link to="/booking">Reservations</Link>
              </li>
              <li><a href="#order-online">Order Online</a></li>
              <li><a href="#login">Login</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/booking"
              element={<BookingForm availableTimeState={availableTimeState}
                availableTimeDispatch={availableTimeDispatch}
              />} />
          </Routes>
        </main>
        <footer>The footer</footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
