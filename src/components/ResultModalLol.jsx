import React, { useRef } from "react";
import { FaClipboard, FaImage } from "react-icons/fa";
import { toPng } from "html-to-image";
import topLaneImage from "../assets/lol_lane/top.svg";
import jungleLaneImage from "../assets/lol_lane/jungle.svg";
import midLaneImage from "../assets/lol_lane/mid.svg";
import adcLaneImage from "../assets/lol_lane/adc.svg";
import supportLaneImage from "../assets/lol_lane/support.svg";
import tierColors from "../styles/constants.json";

export default function ResultModalLol({ isOpen, teams, onClose }) {
  const modalRef = useRef(null);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal__overlay")) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const laneIcons = {
    top: topLaneImage,
    jungle: jungleLaneImage,
    mid: midLaneImage,
    adc: adcLaneImage,
    support: supportLaneImage,
  };

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

  const copyToClipboard = () => {
    const resultText = generateResultText();
    navigator.clipboard.writeText(resultText).then(() => {
      alert("copied results!");
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
        })
        .catch((error) => {
          console.error("Error generating image:", error);
        });
    }
  };

  return (
    <div
      className="modal__overlay fixed inset-0 z-[100000] flex items-center justify-center bg-black bg-opacity-65"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl rounded-lg shadow-2xl bg-gradient-to-r from-purple-800 to-indigo-900 p-7"
      >
        <button
          className="absolute right-4 top-0 text-[40px] text-white hover:text-yellow-300"
          onClick={onClose}
        >
          &times;
        </button>

        {teams.missingPositions?.length > 0 ||
        teams.insufficientPositions?.length > 0 ? (
          <div className="text-center">
            <h2 className="text-4xl font-bold bg-transparent">
              <span className="text-white">⚠️ Need more players for</span>{" "}
              {teams.missingPositions.map((pos) => (
                <img
                  key={pos}
                  src={laneIcons[pos]}
                  alt={pos}
                  className="inline w-8 h-8"
                />
              ))}
              &nbsp;⚠️
            </h2>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-2 bg-transparent sm:grid-cols-2">
              {/* Team 1 */}
              <div className="p-3 text-white bg-transparent rounded-lg">
                <h2 className="text-4xl font-semibold text-center text-yellow-300 bg-transparent">
                  Team 1
                </h2>
                <h2 className="mb-6 text-2xl font-semibold text-center text-yellow-300 bg-transparent">
                  [ Total Points: {teams.team1Pts} ]
                </h2>
                <ul className="space-y-4 bg-transparent">
                  {teams.team1.map((player, index) => (
                    <li
                      key={index}
                      className="flex justify-between p-3 bg-opacity-50 rounded-lg shadow-md bg-zinc-900"
                    >
                      <img
                        src={laneIcons[player.selectedLanes[0]]}
                        alt={player.selectedLanes[0]}
                        className="w-8 h-8"
                      />
                      <span className="text-2xl text-white bg-transparent do-hyeon-regular">
                        {player.playerName}
                      </span>
                      <span
                        className="text-xl text-white bg-transparent"
                        style={{ color: tierColors.lol_color[player.tier] }}
                      >
                        {player.tier}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team 2 */}
              <div className="p-3 text-white bg-transparent rounded-lg">
                <h2 className="text-4xl font-semibold text-center text-yellow-300 bg-transparent">
                  Team 2
                </h2>
                <h2 className="mb-6 text-2xl font-semibold text-center text-yellow-300 bg-transparent">
                  [ Total Points: {teams.team2Pts} ]
                </h2>
                <ul className="space-y-4 bg-transparent">
                  {teams.team2.map((player, index) => (
                    <li
                      key={index}
                      className="flex justify-between p-3 bg-opacity-50 rounded-lg shadow-md bg-zinc-900"
                    >
                      <img
                        src={laneIcons[player.selectedLanes[0]]}
                        alt={player.selectedLanes[0]}
                        className="w-8 h-8"
                      />
                      <span className="text-2xl text-white bg-transparent do-hyeon-regular">
                        {player.playerName}
                      </span>
                      <span
                        className="text-xl text-white bg-transparent"
                        style={{ color: tierColors.lol_color[player.tier] }}
                      >
                        {player.tier}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 text-center bg-transparent">
                <h2 className="mb-2 text-4xl font-bold text-yellow-300 bg-transparent">
                  Point Difference: {Math.abs(teams.team1Pts - teams.team2Pts)}
                </h2>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-xl text-white hover:text-yellow-300"
              >
                <FaClipboard className="text-2xl" />
                <span>copy results</span>
              </button>
              <button
                onClick={saveAsImage}
                className="flex items-center gap-2 text-xl text-white hover:text-yellow-300"
              >
                <FaImage className="text-2xl" />
                <span>save as image</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
