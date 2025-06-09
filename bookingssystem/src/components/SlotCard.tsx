import { Room, Slot } from "@/types/type";
import React from "react";

interface SlotCardProps {
  slot: Slot;
  room: Room;
}

export default function SlotCard({ slot, room }: SlotCardProps) {
  return (
    <button className="flex flex-col border-2 text-left border-emerald-700 m-2 rounded-lg p-2 text-sm">
      <p>
        {room.name} ({room.capacity})
      </p>
      <p>{slot.time}</p>
    </button>
  );
}
