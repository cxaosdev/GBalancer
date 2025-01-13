import React from "react";
import { IoWarning } from "react-icons/io5";

export default function WarningModal({ onClose, onContinue }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0C0D0D] bg-opacity-50">
      <div className="rounded-md bg-[#0C0D0D] bg-opacity-90 p-10 text-center">
        <h2 className="flex mb-10 space-x-2 text-4xl do-hyeon-regular">
          <IoWarning />
          <span>Please fill out all fields!</span>
        </h2>
        <div className="flex justify-center gap-5">
          <button
            onClick={onClose}
            className="py-3 text-2xl text-white bg-green-500 rounded-md do-hyeon-regular px-7"
          >
            OK
          </button>
          <button
            onClick={onContinue}
            className="py-3 text-2xl text-white bg-red-500 rounded-md do-hyeon-regular px-7"
          >
            Use Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
