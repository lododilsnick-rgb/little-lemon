import './App.css';
import { useReducer, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router";

import Home from './pages/Home';
import About from './pages/About';
import BookingPage from './pages/BookingPage';
import ConfirmedBooking from './pages/ConfirmedBooking';

import { fetchAPI, submitAPI } from './api';

const LOCAL_STORAGE_STATE_MACHINE_KEY = "LOCAL_STORAGE_STATE_MACHINE_KEY";

/**
 *
 * @param {'availableTimes':['hh:mm'], 'bookingSlots':[{'date':'mm-dd-yyyy', 'time':'hh:mm'}]} state The used dates and times.
 * @param { type: 'reserve-time', 'data': {'date':'mm-dd-yyyy', 'time':'hh:mm'} } action The action to perform on state data.
 *  action.types: 'reserve-time'
 *  action.time: {'mm-dd-yyyy': ['hh:mm']}
 * @returns object with times taken {'mm-dd-yyyy':['hh:mm']}
 */
export function reduceAvailableTimeState(state, action) {
  console.log('reducer state:', state);
  console.log('reducer action:', action.type);
  var newState = state;

  switch (action.type) {
    case 'reserve-time':
      newState = reserveTime(state, action);

      break;
    case 'navigate-to-confirmation':
      newState = navigateToConfirmation(state, action);

      break;
    case 'set-times-for-date':
      console.log('set-times-for-date')
      newState = setTimesForDate(state, action);

      break;
    case 'change-date':
      console.log('change-date')
      newState = changeDate(state, action);

      break;
    default:
      newState = state;
  };

  saveBookingSlots(newState.bookingSlots);

  return newState;
}

function reserveTime(state, action) {
  console.log(`reserveTime`);
  console.log(action);
  let newState = state;

  if (action.bookingSlot) {
    let found = state.bookingSlots.find((item) => {
      return (item.resDate === action.bookingSlot.resDate && item.resTime === action.bookingSlot.resTime);
    });

    console.log(`found: ${found}`);

    if (!found) {
      console.log(`adding slot`);
      console.log(action.bookingSlot);
      newState = {
        ...state,
        bookingSlots: state.bookingSlots.concat([action.bookingSlot]),
        currentCurrentBookingToSubmit: action.bookingSlot
      };

      newState.bookingSlots.sort((a, b) => {
        console.log(`a: ${a.resDate}, b: ${b.resDate}`);

        if (a.resDate < b.resDate) {
          return -1;
        }

        if (a.resDate > b.resDate) {
          return 1;
        }

        return 0;
      });
    }
  }

  return newState;
}

function setTimesForDate(state, action) {
  let newState = { ...state, availableTimes: action.data.availableTimes };

  return newState;
}

function navigateToConfirmation(state, action) {
  let newState = { ...state, action: action };

  return newState;
}

function changeDate(state, action) {
  console.log(`changeDate action:  ${action.type}, ${action.date}`);
  let newState = { ...state, currentDate: action.date };

  return newState;
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
  return fetchAPI(new Date());
}

export function updateTimes(date) {
  return fetchAPI(date);
}

/**
 * @typedef {Object} Slot
 * @property {String} resDate
 * @property {String} resTime
 * @property {number} guests
 * @property {String} occasion
 */

/**
 * Save slot to local storage
 * @param {Slot[]} slots
 */
export function saveBookingSlots(slots) {
  window.localStorage.setItem(LOCAL_STORAGE_STATE_MACHINE_KEY, JSON.stringify(slots));
}

/**
 * Get slot from local storage
 * @returns {Slot[]}
 */
export function getBookingSlots() {
  return (window.localStorage.getItem(LOCAL_STORAGE_STATE_MACHINE_KEY)) ? JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_STATE_MACHINE_KEY)) : [];
}

function submitForm(formData) {
  return submitAPI(formData);
}

function App() {
  const [availableTimeState, availableTimeDispatch] = useReducer(reduceAvailableTimeState,
    {
      availableTimes: initializeTimes(),
      currentDate: formatDate(new Date()),
      bookingSlots: getBookingSlots(),
      currentCurrentBookingToSubmit: null
    });

  //Runs on first render.
  useEffect(() => {
    let currentDate = new Date();
    let dateString = formatDate(currentDate);
    INITIAL_TIMES = fetchAPI(new Date());
    console.log(`Initial times: ${INITIAL_TIMES}`);
    availableTimeDispatch({ 'type': 'set-times-for-date', 'data': { 'date': dateString, 'availableTimes': INITIAL_TIMES } })
  }, []);

  //Runs when current date changes.
  useEffect(() => {
    let currentDate = new Date(availableTimeState.currentDate);
    let availableTimes = fetchAPI(currentDate);
    console.log(`use effect got available times: ${availableTimes}`);
    availableTimeDispatch({ 'type': 'set-times-for-date', 'data': { 'date': availableTimeState.currentDate, 'availableTimes': availableTimes } })
  }, [availableTimeState.currentDate]);

  //submit current booking
  useEffect(() => {
    if (availableTimeState.currentCurrentBookingToSubmit) {
      console.log(`use effect call booking api: ${availableTimeState.currentCurrentBookingToSubmit}`);
      let success = submitForm(availableTimeState.currentCurrentBookingToSubmit);
      console.log(`submit success: ${success}`);

      if (success) {
        availableTimeDispatch({ 'type': 'navigate-to-confirmation' })
      }
    }
  }, [availableTimeState.currentCurrentBookingToSubmit]);

  return (
    <div class="app">
      <BrowserRouter>
        <header className="app-header">
          <div className="app-logo">
            <a href="#home">
              <img src="/images/Logo.svg" alt="logo" />
            </a>
          </div>
          <nav>
            <ul className="nav-links">
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
            <Route path="/confirmed-booking"
              element={<ConfirmedBooking availableTimeState={availableTimeState} />} />
          </Routes>
        </main>
        <footer>
          Copyright Lulu 2026. All rights reserved.
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;

