export default function BookingSlot({ date, time, guests, occasion }) {
  return (
    <div class="booking-slot-grid-container card-paragraph-text">
      <div className="card-paragraph-text">
        {date}
      </div>
      <div>
        {time}
      </div>
      <div>
        {guests}
      </div>
      <div>
        {occasion}
      </div>
    </div>
  );
}