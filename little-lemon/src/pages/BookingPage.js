import BookingTable from "../components/BookingTable";
import BookingForm from "../components/BookingForm";
import { useNavigate } from "react-router";

export default function BookingPage({ availableTimeState, availableTimeDispatch }) {
  const navigate = useNavigate();
  
  if(availableTimeState.action && availableTimeState.action.type === 'navigate-to-confirmation'){
    navigate('/confirmed-booking');
  }

  return (
    <div class="grid-container">
      <BookingForm availableTimeState={availableTimeState}
                availableTimeDispatch={availableTimeDispatch} />
      <BookingTable availableTimeState={availableTimeState} />
    </div>
  );
}