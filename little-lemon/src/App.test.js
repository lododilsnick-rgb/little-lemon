import { fireEvent, render, screen } from "@testing-library/react";
import BookingForm from "./pages/BookingForm";
import App from "./App.js";

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
});