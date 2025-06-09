import { Room } from "@/types/type";
import React, { useState } from "react";
import { DropArrow } from "./Icons";

interface RoomFilterProps {
  rooms: Room[];
  filteredRooms: Room[];
  setFilteredRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}

export default function RoomFilter({
  rooms,
  filteredRooms,
  setFilteredRooms,
}: RoomFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleRoom = (room: Room) => {
    setFilteredRooms((prev) =>
      prev.some((r) => r.id === room.id)
        ? prev.filter((r) => r.id !== room.id)
        : [...prev, room]
    );
  };

  const isSelected = (room: Room) =>
    filteredRooms.some((r) => r.id === room.id);

  return (
    <div className="relative  w-full ">
      <button
        className="flex w-full max-w-41 rounded-lg border border-stone-300 px-3 py-2 text-left"
        aria-expanded={isOpen}
        aria-controls="room-options"
        aria-haspopup="listbox"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {filteredRooms.length < rooms.length
          ? `${filteredRooms.length} valda rum`
          : "Mötesrum"}
        <DropArrow isOpen={isOpen} />
      </button>

      {isOpen && (
        <div className="absolute mt-2 rounded-lg w-full border border-stone-300 bg-[#ECECEC] shadow-2xl md:w-1/2 lg:w-1/2">
          <fieldset id="room-options" role="listbox" className="py-8">
            {rooms.map((room) => (
              <label
                role="option"
                aria-selected={isSelected(room)}
                key={room.id}
                htmlFor={room.name}
                className="flex justify-between px-6 py-1 cursor-pointer"
              >
                <p>
                  {room.name} ({room.capacity} personer)
                </p>
                <input
                  id={room.name}
                  type="checkbox"
                  checked={isSelected(room)}
                  onChange={() => toggleRoom(room)}
                  className="w-5 "
                />
              </label>
            ))}
          </fieldset>

          <div className="flex justify-between gap-2 px-4 pb-3 ">
            <button
              className=" text-white bg-stone-900 p-3 rounded-xl w-full"
              onClick={() => setIsOpen(false)}
            >
              Välj
            </button>
            <button
              className=" text-white bg-neutral-700 p-3 rounded-xl w-full"
              onClick={() => setFilteredRooms([])}
            >
              Avmarkera
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
