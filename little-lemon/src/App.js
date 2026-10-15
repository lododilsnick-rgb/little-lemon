import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from './pages/Home';
import About from './pages/About';
import BookingPage from './pages/BookingPage';
import { useReducer, useState, useEffect } from 'react';
import { fetchAPI, submitAPI } from './api';

/**
 *
 * @param {'availableTimes':['hh:mm'], 'bookingSlots':[{'date':'mm-dd-yyyy', 'time':'hh:mm'}]} state The used dates and times.
 * @param { type: 'reserve-time', 'bookingTime': {'date':'mm-dd-yyyy', 'time':'hh:mm'} } action The action to perform on state data.
 *  action.types: 'reserve-time'
 *  action.time: {'mm-dd-yyyy': ['hh:mm']}
 * @returns object with times taken {'mm-dd-yyyy':['hh:mm']}
 */
export function updateTimes(state, action) {
  console.log('reducer state:', state);
  console.log('reducer action:', action);
  var newState = state;

  switch (action.type) {
    case 'reserve-time':
      newState = reserveTime(state, action);

      break;
    case 'get-times-for-date':
      newState = getTimesForDate(state, action);

      break;
    default:
      newState = state;
  };

  return newState;
}

function reserveTime(state, action) {
  if (!state.bookedTimes[action.bookingTime.date]) {
    state.bookedTimes[action.bookingTime.date] = [];
  }

  state.bookedTimes[action.bookingTime.date].push(action.bookingTime.time);

  return state;
}

function getTimesForDate(state, action) {
  return state;
}

export function formatDate(date) {
  var dateString = (new Intl.DateTimeFormat('en-US')).format(date)
  return dateString.replaceAll('/', '-');
}

let INITIAL_TIMES = [];

/**
 *
 * @returns ['hh:mm']
 */
export function initializeTimes() {
  return INITIAL_TIMES;
}

function App() {
  const [availableTimes, setAvailableTimes] = useState(null);

  //Runs on first render.
  // useEffect(() => {
  //   INITIAL_TIMES = fetchAPI(new Date());
  //   console.log(`Initial times: {INITIAL_TIMES}`);
  // }, []);

  const [availableTimeState, availableTimeDispatch] = useReducer(updateTimes,
    {
      availableTimes: initializeTimes(),
      currentDate: new Date(),
      bookingSlots: []
    });

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
              element={<BookingPage availableTimeState={availableTimeState}
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

