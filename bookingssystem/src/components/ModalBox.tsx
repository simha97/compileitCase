import React from "react";
import { Smiley } from "./Icons";

export default function ModalBox() {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 bg-black/50 flex justify-center items-center"
    >
      <div className="flex flex-col justify-center items-center w-60 h-34 bg-[#ECECEC] rounded-xl p-6 ">
        <p id="modal-title" className="text-md mb-4">
          Ditt rum är bokat!
        </p>
        <span role="img" aria-label="smiley" className="text-4xl">
          <Smiley />
        </span>
      </div>
    </div>
  );
}
