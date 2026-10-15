import { fireEvent, render, screen } from "@testing-library/react";
import BookingForm from "./components/BookingForm.js";
import App from "./App.js";
import { initializeTimes, formatDate, updateTimes } from "./App.js";

describe("Booking Form", () => {
  test("Renders the BookingForm heading", () => {

    let intialAvailableTimes = ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    let availableTimeState = { availableTimes: intialAvailableTimes };

    function availableTimeDispatch() {

    }

    render(<BookingForm availableTimeState={availableTimeState}
      availableTimeDispatch={availableTimeDispatch} />);
    const headingElement = screen.getByText("Book Now");
    expect(headingElement).toBeInTheDocument();
  });

  test("Initialize times", () => {
    expect(initializeTimes().bookedTimes).toEqual({});
  });

  test("Update times", () => {
    let dateString = formatDate(new Date());
    let timeString = '19:00';
    let action = { 'type': 'reserve-time', 'bookingTime': { date: dateString, 'time': timeString } };
    let newState = updateTimes(initializeTimes(), action);
    console.log("newState");
    console.log(newState);
    expect(newState.bookedTimes[dateString].length).toEqual(1);
    expect(newState.bookedTimes[dateString].find((element)=>element === timeString)).toEqual(timeString);
  });
});