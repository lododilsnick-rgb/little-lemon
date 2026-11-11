import { fireEvent, render, screen } from "@testing-library/react";
import BookingForm from "./components/BookingForm.js";
import { isValid } from "./components/BookingForm.js";
import { initializeTimes, formatDate, updateTimes, saveBookingSlots, getBookingSlots } from "./App.js";

const BOOKING_SLOTS = [
  {
    "resDate": formatDate(new Date()),
    "resTime": "11:30",
    "occasion": "Birthday",
    "guests": 12
  },
  {
    "resDate": formatDate(new Date()),
    "resTime": "20:30",
    "occasion": "Anniversary",
    "guests": 2
  }
];

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
    let times = initializeTimes();
    expect(times).not.toBeNull();

    times.forEach((time, index) => {
      expect(time).toMatch(/\d+:\d\d/);
    });
  });

  test("Update times", () => {
    let theDate = new Date();
    theDate.setDate(theDate.getDate() + 1);
    let times = updateTimes(theDate);

    expect(times).not.toBeNull();

    times.forEach((time, index) => {
      expect(time).toMatch(/\d+:\d\d/);
    });
  });

  test("localstorage", () => {
    saveBookingSlots(BOOKING_SLOTS);

    let slots = getBookingSlots();
    expect(slots).not.toBeNull();

    slots.forEach((slot, index) => {
      expect(slot.occasion).toBe(BOOKING_SLOTS[index].occasion);
      expect(slot.guests).toBe(BOOKING_SLOTS[index].guests);
      expect(slot.resDate).toBe(BOOKING_SLOTS[index].resDate);
      expect(slot.resTime).toBe(BOOKING_SLOTS[index].resTime);
    });
  });

  test("form validation function", () => {
    let name = "resDate";
    let value = formatDate(new Date());

    let errorMessage = isValid(name, value);
    expect(errorMessage).toBeNull();

    value = null;
    errorMessage = isValid(name, value);
    expect(errorMessage).not.toBeNull();
  });
});