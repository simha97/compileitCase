import React from "react";
import SlotCard from "./SlotCard";
import { Room, Slot } from "@/types/type";

interface SlotsTableProps {
  availableSlots: Slot[];
  rooms: Room[];
}

export default function SlotsTable({ availableSlots, rooms }: SlotsTableProps) {
  const days = ["18 okt", "19 okt", "20 okt"];
  return (
    <table className="border w-full">
      <thead>
        <tr>
          {days.map((day) => (
            <th key={day} className="border text-center">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {days.map((day) => (
            <td key={day} className="border align-top">
              {availableSlots
                .filter((slot) => slot.date === day)
                .map((slot) => {
                  const room = rooms.find((room) => room.id === slot.room_id);
                  return room ? (
                    <SlotCard key={slot.id} slot={slot} room={room} />
                  ) : null;
                })}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
