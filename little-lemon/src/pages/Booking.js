import { useState } from 'react';

export default function Booking({ availableTimeState, availableTimeDispatch }) {
  const [formData, setFormData] = useState({ resDate: (new Date()), resTime: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dynamically update the state matching the input's name attribute
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    console.log('Submitted Data:', formData);
    availableTimeDispatch({ type: 'reserve-time', time: formData })
  };

  // const availableTimes = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  console.log('booking availableTimeState:', availableTimeState);
  
  return (
    <div class="booking card-paragraph-text">
      <form class="booking-form"
        onSubmit={handleSubmit}>
        <div class="section-title-text">Reservations</div>
        <label class="card-title-text"
          for="res-date">Choose date</label>
        <input
          type="date"
          id="resDate"
          name="resDate"
          value={formData.resDate}
          onChange={handleChange}
        />
        <label class="card-title-text"
          for="res-time">Choose time</label>
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
        <label class="card-title-text"
          for="guests">Number of guests</label>
        <input type="number" placeholder="1" min="1" max="10" id="guests" />
        <label class="card-title-text"
          for="occasion">Occasion</label>
        <select id="occasion">
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>
        <button class="app-hero-button"
          type="submit">
          Make Your reservation
        </button>
      </form>
    </div>
  );
}