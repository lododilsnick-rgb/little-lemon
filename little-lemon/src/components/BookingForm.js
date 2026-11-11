import { useState } from 'react';

export default function BookingForm({ availableTimeState, availableTimeDispatch }) {
  const [formData, setFormData] = useState({
    //resDate: availableTimeState.currentDate,
    resTime: availableTimeState.availableTimes[0],
    occasion: 'Birthday',
    guests: 1
  });

  const [errors, setErrors] = useState({ errorCount: 0 });

  // Single function to validate fields dynamically
  const isValid = (name, value) => {
    let errorMsg = '';

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

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));

    return (errorMsg) ? false : true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dynamically update the state matching the input's name attribute
    if (isValid(name, value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    console.log(`Name: ${name}, value: ${value}`);

    if (isValid(name, value)) {
      // Dynamically update the state matching the input's name attribute
      setFormData((prev) => ({ ...prev, [name]: value }));
      availableTimeDispatch({ 'type': 'change-date', 'date': value })
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    let hasError = !isValid("resDate", formData.resDate);
    hasError |= !isValid("resTime", formData.resTime);

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
          for="res-date">Choose date</label>
        <input
          type="date"
          id="resDate"
          name="resDate"
          value={formData.resDate}
          onChange={handleDateChange}
        />
        {/* Inline Error Message */}
        {errors.resDate && <span style={{ color: "red", fontSize: "12px" }}>{errors.resDate}</span>}
        <label className="card-title-text"
          htmlfor="res-time">Choose time</label>
        <select
          id="resTime"
          name="resTime"
          value={formData.resTime}
          onChange={handleChange}>
          {availableTimeState.availableTimes.map((theTime) => (
            <option value={theTime}>
              {theTime}
            </option>
          ))}
        </select>
        {/* Inline Error Message */}
        {errors.resTime && <span style={{ color: "red", fontSize: "12px" }}>{errors.resTime}</span>}
        <label className="card-title-text"
          for="guests">Number of guests</label>
        <input type="number"
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          name="guests"
          onChange={handleChange} />
        <label className="card-title-text"
          for="occasion">Occasion</label>
        <select id="occasion"
          name="occasion"
          onChange={handleChange}>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>
        <button className="app-hero-button"
          type="submit">
          Make Your reservation
        </button>
      </form>
    </div>
  );
}