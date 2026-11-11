import { useState } from 'react';

export function isValid(name, value) {
  let errorMsg = null;

  switch (name) {
    case "resDate":
      if (!value) {
        errorMsg = "Reservation date is required.";
        console.log(`error resDate`);
      }
      break;
    case 'resTime':
      if (!value) {
        errorMsg = "Reservation time is required.";
      }
      break;
    default:
      ;;
  };

  return errorMsg;
}


export default function BookingForm({ availableTimeState, availableTimeDispatch }) {
  const [formData, setFormData] = useState({
    //resDate: availableTimeState.currentDate,
    resTime: availableTimeState.availableTimes[0],
    occasion: 'Birthday',
    guests: 1
  });

  const [errors, setErrors] = useState({ errorCount: 0 });

  // Single function to validate fields dynamically
  const checkValidityAndSetError = (name, value) => {
    let errorMsg = isValid(name, value);

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));

    return (errorMsg) ? false : true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dynamically update the state matching the input's name attribute
    if (checkValidityAndSetError(name, value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    console.log(`Name: ${name}, value: ${value}`);

    if (checkValidityAndSetError(name, value)) {
      // Dynamically update the state matching the input's name attribute
      setFormData((prev) => ({ ...prev, [name]: value }));
      availableTimeDispatch({ 'type': 'change-date', 'date': value })
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    let hasError = !checkValidityAndSetError("resDate", formData.resDate);
    hasError |= !checkValidityAndSetError("resTime", formData.resTime);

    if (hasError) {
      setTimeout(function () {
        alert("The data you are trying to submit contains errors!");
      }, 10);
    } else {
      alert("Form submitted successfully!");
      availableTimeDispatch({
        type: 'reserve-time',
        bookingSlot: formData
      });
    }
  };

  console.log('booking availableTimeState:', availableTimeState);

  return (
    <div className="booking card-paragraph-text">
      <form className="booking-form"
        onSubmit={handleSubmit}>
        <div className="section-title-text">Reservations</div>
        <div className="section-title-text">Book Now</div>
        <label className="card-title-text"
          htmlfor="resDate">Choose date</label>
        <input
          type="date"
          id="resDate"
          name="resDate"
          value={formData.resDate}
          onChange={handleDateChange}
          aria-label="reservation date"
        />
        {/* Inline Error Message */}
        {errors.resDate && <span style={{ color: "red", fontSize: "12px" }}>{errors.resDate}</span>}
        <label className="card-title-text"
          htmlfor="resTime">Choose time</label>
        <select
          id="resTime"
          name="resTime"
          value={formData.resTime}
          onChange={handleChange}
          aria-label="reservation time">
          {availableTimeState.availableTimes.map((theTime) => (
            <option value={theTime}
              aria-label={theTime}>
              {theTime}
            </option>
          ))}
        </select>
        {/* Inline Error Message */}
        {errors.resTime && <span style={{ color: "red", fontSize: "12px" }}>{errors.resTime}</span>}
        <label className="card-title-text"
          htmlfor="guests">Number of guests</label>
        <input type="number"
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          name="guests"
          onChange={handleChange}
          aria-label="number of guests" />
        <label className="card-title-text"
          htmlfor="occasion">Occasion</label>
        <select id="occasion"
          name="occasion"
          onChange={handleChange}
          aria-label="occasion">
          <option
            value="Birthday"
            aria-label="birthday">Birthday</option>
          <option
            value="Anniversary"
            aria-label="Anniversary">Anniversary</option>
        </select>
        <button className="app-hero-button"
          type="submit"
          aria-label="Submit reservation">
          Make Your reservation
        </button>
      </form>
    </div>
  );
}