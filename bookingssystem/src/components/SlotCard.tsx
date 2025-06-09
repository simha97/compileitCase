import { Room, Slot } from "@/types/type";
import React from "react";
import { useBooking } from "@/context/BookingContext";

interface SlotCardProps {
  slot: Slot;
  room: Room;
}

export default function SlotCard({ slot, room }: SlotCardProps) {
  const { selectedSlotId, setSelectedSlotId } = useBooking();

  const handleSelect = () => {
    setSelectedSlotId(slot.id);
  };

  const isSelected = selectedSlotId === slot.id;
  return (
    <button
      onClick={handleSelect}
      className={`w-full flex flex-col border-2 text-left rounded-lg p-1 mb-2 text-sm border-emerald-700 ${
        isSelected ? "bg-emerald-900 text-white" : ""
      }`}
    >
      <p>
        {room.name} ({room.capacity})
      </p>
      <p>{slot.time}</p>
    </button>
  );
}
