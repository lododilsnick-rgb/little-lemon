import BookingTable from "../components/BookingTable";
import BookingForm from "../components/BookingForm";

export default function BookingPage({ availableTimeState, availableTimeDispatch }) {
  return (
    <div>
      <BookingForm availableTimeState={availableTimeState}
                availableTimeDispatch={availableTimeDispatch} />
      <BookingTable availableTimeState={availableTimeState} />
    </div>
  );
}