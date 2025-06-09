import SlotsTable from "@/components/SlotsTable";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { Room, Slot } from "@/types/type";
import RoomFilter from "@/components/RoomFilter";
import { useRouter } from "next/router";
import { useBooking } from "@/context/BookingContext";

export default function Booking() {
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();
  const { selectedSlotId } = useBooking();

  useEffect(() => {
    const fetchData = async () => {
      const { data: slotData, error: slotError } = await supabase
        .from("slots")
        .select("*")
        .eq("booked", false);

      const { data: roomData, error: roomError } = await supabase
        .from("rooms")
        .select("*");

      if (slotError || roomError) {
        console.error("Error:", slotError || roomError);
      } else {
        setAvailableSlots(slotData);
        setRooms(roomData);
        setFilteredRooms(roomData);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleNext = () => {
    if (!selectedSlotId) {
      setErrorMsg("Vänligen välj en tid innan du går vidare.");
      return;
    }
    setErrorMsg("");
    router.push("/confirm");
  };

  return (
    <main className="flex flex-col justify-items-center min-h-screen p-6 pb-12 gap-10">
      <h1 className="text-4xl leading-[1] pt-20">Välj en tid</h1>

      {loading ? (
        <p className="text-gray-600" aria-live="polite" role="alert">
          Laddar...
        </p>
      ) : (
        <>
          <RoomFilter
            rooms={rooms}
            filteredRooms={filteredRooms}
            setFilteredRooms={setFilteredRooms}
          />
          <SlotsTable availableSlots={availableSlots} rooms={filteredRooms} />
          {errorMsg && (
            <p className="text-red-600 text-sm text-center" aria-live="polite">
              {errorMsg}
            </p>
          )}
          <button
            onClick={handleNext}
            aria-label="Gå vidare till bekräftelse"
            className="mt-auto w-full rounded-2xl bg-stone-900 p-3.5 text-white text-center"
          >
            Nästa
          </button>
        </>
      )}
    </main>
  );
}
