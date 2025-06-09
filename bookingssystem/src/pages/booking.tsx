import NextButton from "@/components/NextButton";
import SlotsTable from "@/components/SlotsTable";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { Room, Slot } from "@/types/type";
import RoomFilter from "@/components/RoomFilter";

export default function Booking() {
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

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
    };

    fetchData();
  }, []);

  return (
    <div
      className={` flex flex-col  justify-items-center min-h-screen p-6 pb-13 gap-16 sm:p-20`}
    >
      <h1 className="text-[40px] leading-[1] ">Välj en tid</h1>

      <RoomFilter
        rooms={rooms}
        filteredRooms={filteredRooms}
        setFilteredRooms={setFilteredRooms}
      />
      <SlotsTable availableSlots={availableSlots} rooms={filteredRooms} />
      <NextButton href="/confirm">Nästa</NextButton>
    </div>
  );
}
