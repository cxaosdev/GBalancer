import React, { useRef } from "react";
import tierColors from "../styles/constants.json";
import { toPng } from "html-to-image";
import { FaClipboard, FaImage, FaLink } from "react-icons/fa";

export default function ResultModalVlrt({
  isOpen,
  teams,
  onClose,
  generateShareableLink,
}) {
  const modalRef = useRef(null);
  const toastRef = useRef(null);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal__overlay")) {
      onClose();
    }
  };

  const showToast = (message) => {
    if (toastRef.current) {
      toastRef.current.innerText = message;
      toastRef.current.classList.remove("opacity-0");
      setTimeout(() => {
        toastRef.current.classList.add("opacity-0");
      }, 4000);
    }
  };

  const copyToClipboard = () => {
    const resultText = generateResultText();
    navigator.clipboard.writeText(resultText).then(() => {
      showToast("Results copied!");
    });
  };

  const saveAsImage = () => {
    if (modalRef.current) {
      toPng(modalRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "result.png";
          link.click();
          showToast("Image saved!");
        })
        .catch((error) => {
          console.error("Error generating image:", error);
        });
    }
  };

  const copyLink = () => {
    const link = generateShareableLink();
    navigator.clipboard.writeText(link).then(() => showToast("Link copied!"));
  };

  if (!isOpen) return null;

  const generateResultText = () => {
    const team1Text = teams.team1
      .map((player) => `${player.playerName} (${player.tier})`)
      .join("\n");
    const team2Text = teams.team2
      .map((player) => `${player.playerName} (${player.tier})`)
      .join("\n");

    return `Team 1 [Total Points: ${teams.team1Pts}]:\n${team1Text}\n\nTeam 2 [Total Points: ${teams.team2Pts}]:\n${team2Text}\n\nPoint Difference: ${Math.abs(
      teams.team1Pts - teams.team2Pts,
    )}`;
  };

  return (
    <div
      className="modal__overlay fixed inset-0 z-[100000] flex items-center justify-center bg-black bg-opacity-65"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="relative w-[60em] min-w-[40em] rounded-lg bg-gradient-to-r from-purple-800 to-indigo-900 p-7 shadow-2xl"
      >
        <button
          className="absolute right-4 top-0 text-[50px] text-white hover:text-yellow-300"
          onClick={onClose}
        >
          &times;
        </button>

        <div
          ref={toastRef}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 transform rounded-md bg-zinc-700 px-4 py-2 text-[1.3em] text-white opacity-0 shadow-lg transition-opacity duration-500 ease-out"
        ></div>

        {/* Team Details and Points */}
        <div className="grid grid-cols-[auto-fit] gap-2 bg-transparent sm:grid-cols-2">
          {/* Team 1 */}
          <div className="rounded-lg bg-transparent p-3 text-white">
            <h2 className="bg-transparent text-center text-4xl font-semibold text-yellow-300">
              Team 1
            </h2>
            <h2 className="mb-6 bg-transparent text-center text-2xl font-semibold text-yellow-300">
              [ Total Points: {teams.team1Pts} ]
            </h2>
            <ul className="space-y-4 bg-transparent">
              {teams.team1.map((player, index) => (
                <li
                  key={index}
                  className="flex justify-between rounded-lg bg-zinc-900 bg-opacity-50 p-3 px-5 shadow-md"
                >
                  <span className="do-hyeon-regular bg-transparent text-2xl">
                    {player.playerName}
                  </span>
                  <span
                    className="bg-transparent text-xl"
                    style={{ color: tierColors.vlrt_color[player.tier] }}
                  >
                    {player.tier}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Team 2 */}
          <div className="rounded-lg bg-transparent p-3 text-white">
            <h2 className="bg-transparent text-center text-4xl font-semibold text-yellow-300">
              Team 2
            </h2>
            <h2 className="mb-6 bg-transparent text-center text-2xl font-semibold text-yellow-300">
              [ Total Points: {teams.team2Pts} ]
            </h2>
            <ul className="space-y-4 bg-transparent">
              {teams.team2.map((player, index) => (
                <li
                  key={index}
                  className="flex justify-between rounded-lg bg-zinc-900 bg-opacity-50 p-3 px-5 shadow-md"
                >
                  <span className="do-hyeon-regular bg-transparent text-2xl">
                    {player.playerName}
                  </span>
                  <span
                    className="bg-transparent text-xl"
                    style={{ color: tierColors.vlrt_color[player.tier] }}
                  >
                    {player.tier}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Point Difference */}
          <div className="col-span-2 bg-transparent text-center">
            <h2 className="mb-2 bg-transparent text-4xl font-bold text-yellow-300">
              Point Difference: {Math.abs(teams.team1Pts - teams.team2Pts)}
            </h2>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 text-xl text-white hover:text-yellow-300"
          >
            <FaClipboard className="text-2xl" />
            <span>Copy Results</span>
          </button>
          <button
            onClick={saveAsImage}
            className="flex items-center gap-2 text-xl text-white hover:text-yellow-300"
          >
            <FaImage className="text-2xl" />
            <span>Save as Image</span>
          </button>
          <button
            onClick={copyLink}
            className="flex items-center gap-2 text-xl text-white hover:text-yellow-300"
          >
            <FaLink className="text-2xl" />
            <span>Copy Link</span>
          </button>
        </div>
      </div>
    </div>
  );
}
