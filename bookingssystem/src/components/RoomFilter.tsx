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

  const clearSelection = () => {
    setFilteredRooms([]);
  };

  const isSelected = (room: Room) =>
    filteredRooms.some((r) => r.id === room.id);

  return (
    <div className="relative  w-full ">
      <button
        className="flex w-full max-w-41 rounded-lg border border-stone-300 p-2 text-left"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {filteredRooms.length < rooms.length
          ? `${filteredRooms.length} valda rum`
          : "Mötesrum"}
        <DropArrow isOpen={isOpen} />
      </button>

      {isOpen && (
        <div className="absolute mt-2 rounded-lg w-full border border-stone-300 bg-[#ECECEC] shadow-2xl ">
          <div className="py-2">
            {rooms.map((room) => (
              <label
                key={room.id}
                className="flex justify-between px-6 py-2 cursor-pointer"
              >
                <p>
                  {room.name} ({room.capacity} personer)
                </p>
                <input
                  type="checkbox"
                  checked={isSelected(room)}
                  onChange={() => toggleRoom(room)}
                />
              </label>
            ))}
          </div>

          <div className="flex justify-between gap-2 px-4 py-3 ">
            <button
              className=" text-white bg-stone-900 p-4 rounded-xl w-full"
              onClick={() => setIsOpen(false)}
            >
              Bekräfta
            </button>
            <button
              className=" text-white bg-neutral-700 p-4 rounded-xl w-full"
              onClick={clearSelection}
            >
              Rensa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
