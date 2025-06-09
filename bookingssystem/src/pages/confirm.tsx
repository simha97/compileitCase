import React, { useState } from "react";
import { useBooking } from "@/context/BookingContext";
import { supabase } from "@/lib/supabaseClient";

export default function Confirm() {
  const [name, setName] = useState("");
  const { selectedSlotId } = useBooking();

  const handleConfirm = async () => {
    const { error } = await supabase
      .from("slots")
      .update({
        booked: true,
        booked_by: name,
      })
      .eq("id", selectedSlotId)
      .eq("booked", false);

    if (error) {
      console.error("Error booking slot:", error);
      alert("Failed to book slot");
    } else {
      console.log(`Booking confirmed for ${name} at slotId: ${selectedSlotId}`);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-items-center min-h-screen p-6 pb-13 gap-16 sm:p-20">
      <h1 className="text-[40px] leading-[1] ">Vem bokar?</h1>

      <div>
        <label htmlFor="name" className="text-xl font-bold">
          Förnamn och efternamn
        </label>
        <input
          id="name"
          type="text"
          placeholder="Skriv ditt fullständiga namn här"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-stone-300 w-full text-s rounded-lg p-2"
        />
      </div>

      <button
        onClick={handleConfirm}
        className="mt-auto w-full rounded-2xl bg-stone-900 p-3.5 text-white text-center"
      >
        Boka
      </button>
    </div>
  );
}
