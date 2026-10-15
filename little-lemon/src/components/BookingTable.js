import BookingSlot from "../components/BookingSlot";

export default function BookingTable({ availableTimeState }) {
    return (
        <div>
            {(availableTimeState.bookingSlots.length > 0) &&
                <div>
                    <div>Booked Reservations</div>
                    <div class="booking-slot-grid-container card-title-text">
                        <div>
                            Date
                        </div>
                        <div>
                            Time
                        </div>
                        <div>
                            Guests
                        </div>
                        <div>
                            Occasion
                        </div>
                    </div>
                </div>
            }
            {availableTimeState.bookingSlots.map((slot) => (
                <BookingSlot date={slot.resDate} time={slot.resTime} occasion={slot.occasion} guests={slot.guests} />
            ))}
        </div>
    );
}