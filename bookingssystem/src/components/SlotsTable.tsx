import React from "react";
import SlotCard from "./SlotCard";
import { Room, Slot } from "@/types/type";
import { ArrowRightIcon, ArrowLeftIcon } from "./Icons";

interface SlotsTableProps {
  availableSlots: Slot[];
  rooms: Room[];
}

export default function SlotsTable({ availableSlots, rooms }: SlotsTableProps) {
  const days = ["18 okt", "19 okt", "20 okt"];
  return (
    <div className="flex-grow ">
      <section className="flex justify-between mb-6">
        <button aria-label="Past 3 days">
          <ArrowLeftIcon />
        </button>
        <p>18 okt - 20 okt</p>
        <button aria-label="Next 3 days">
          <ArrowRightIcon />
        </button>
      </section>

      <table className="w-full flex-grow table-fixed overflow-auto">
        <thead>
          <tr>
            {days.map((day) => (
              <th
                key={day}
                scope="col"
                className="border border-stone-300 text-center py-2"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="h-full">
            {days.map((day) => (
              <td
                key={day}
                aria-label={`Tider för ${day}`}
                className="border border-stone-300 align-top p-2"
              >
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
    </div>
  );
}
