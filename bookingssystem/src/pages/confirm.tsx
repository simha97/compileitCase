import React, { useState } from "react";
import { useBooking } from "@/context/BookingContext";
import { supabase } from "@/lib/supabaseClient";
import ModalBox from "@/components/ModalBox";

export default function Confirm() {
  const [name, setName] = useState("");
  const { selectedSlotId } = useBooking();
  const [confirmed, setConfirmed] = useState(false);
  const [formError, setFormError] = useState("");

  const handleConfirm = async () => {
    if (!name.trim()) {
      setFormError("Skriv ditt namn innan du bokar.");
      return;
    }

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
      setFormError("Det gick inte att boka. Försök igen.");
    } else {
      setConfirmed(true);
      setFormError("");
      setName("");
      console.log(`Booking confirmed for ${name} at slotId: ${selectedSlotId}`);
    }
  };

  return (
    <main className="flex flex-col justify-items-center min-h-screen p-6 pb-13 gap-10">
      {confirmed && <ModalBox />}
      <h1 className="text-4xl leading-[1] pt-20">Vem bokar?</h1>

      <section className="flex flex-col gap-3 w-full">
        <label htmlFor="name" className="text-xl font-bold">
          Förnamn och efternamn
        </label>
        <input
          id="name"
          type="text"
          placeholder="Skriv ditt fullständiga namn här"
          value={name}
          aria-invalid={!!formError}
          aria-describedby={formError ? "name-error" : undefined}
          onChange={(e) => setName(e.target.value)}
          className="border border-stone-300 w-full text-s rounded-lg p-2"
        />
        {formError && (
          <p aria-live="polite" className="text-sm text-red-600">
            {formError}
          </p>
        )}
      </section>

      <button
        id="name-error"
        onClick={handleConfirm}
        aria-label="Bekräfta bokning"
        className="mt-auto w-full rounded-2xl bg-stone-900 p-3.5 text-white text-center"
      >
        Boka
      </button>
    </main>
  );
}
