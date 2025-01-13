import React, { memo, useEffect, useState } from "react";
import adcLaneImage from "../assets/lol_lane/adc.svg";
import jungleLaneImage from "../assets/lol_lane/jungle.svg";
import midLaneImage from "../assets/lol_lane/mid.svg";
import supportLaneImage from "../assets/lol_lane/support.svg";
import tierColors from "../styles/constants.json";
import topLaneImage from "../assets/lol_lane/top.svg";
import { FaAsterisk } from "react-icons/fa";

const PlayerLol = memo(({ playerNum, playerData, handlePlayerChange }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLgView, setIsLgView] = useState(window.innerWidth <= 1380);
  const [isSmView, setIsSmView] = useState(window.innerWidth <= 1080);

  const tiers = [
    { id: "Iron", label: "Iron", pts: 7 },
    { id: "Bronze", label: "Bronze", pts: 13 },
    { id: "Silver", label: "Silver", pts: 17 },
    { id: "Gold", label: "Gold", pts: 25 },
    { id: "Platinum", label: "Platinum", pts: 29 },
    { id: "Emerald", label: "Emerald", pts: 36 },
    { id: "Diamond", label: "Diamond", pts: 42 },
    { id: "Master", label: "M", pts: 45 },
    { id: "GrandMaster", label: "GM", pts: 49 },
    { id: "Challenger", label: "C", pts: 52 },
  ];

  const lanes = [
    { id: "top", label: "Top", image: topLaneImage },
    { id: "jungle", label: "Jungle", image: jungleLaneImage },
    { id: "mid", label: "Mid", image: midLaneImage },
    { id: "adc", label: "ADC", image: adcLaneImage },
    { id: "support", label: "Support", image: supportLaneImage },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsLgView(window.innerWidth <= 1380);
      setIsSmView(window.innerWidth <= 1080);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <div className="player mt-[0.5vh] flex justify-center">
      <section className="players flex items-center justify-between">
        <input
          type="text"
          className="players__input-name w-[7em] text-[1.3em]"
          value={playerData.playerName}
          onChange={(e) => handlePlayerChange("playerName", e.target.value)}
          placeholder={`Player ${playerNum} Name`}
          autoComplete="off"
        />

        <div
          className={`ml-[1vw] flex items-center justify-center gap-[0.4em] ${
            isSmView ? "w-[25em]" : isLgView ? "w-[48em]" : "w-[70em]"
          }`}
        >
          {lanes.map((lane) => (
            <div
              className="lane flex items-center justify-between"
              key={lane.id}
            >
              <input
                id={`player${playerNum}-${lane.id}`}
                className="players__input-lane"
                name={`player${playerNum}-lane`}
                type="checkbox"
                checked={(playerData.selectedLanes || []).includes(lane.id)}
                onChange={(e) =>
                  handlePlayerChange("selectedLanes", lane.id, e.target.checked)
                }
              />
              <label
                htmlFor={`player${playerNum}-${lane.id}`}
                className="players__lanes flex items-center rounded-sm opacity-90"
              >
                <img
                  src={lane.image}
                  alt={lane.label}
                  className="lane__image ] w-[2vw] min-w-[30px] opacity-100"
                />
              </label>
            </div>
          ))}

          <div className="ml-[1vw] flex items-center justify-between">
            {isSmView ? (
              <div className="tier-selection-dropdown relative">
                <div
                  className="tier-dropdown ml-[2vw] flex w-[7em] cursor-pointer items-center justify-center rounded-md bg-white text-center text-[1.3em]"
                  onClick={toggleDropdown}
                >
                  <span
                    className="selected-tier p-0 text-[1.3em]"
                    style={{
                      color: playerData.tier
                        ? tierColors.lol_color[playerData.tier]
                        : "gray",
                    }}
                  >
                    {playerData.tier || (
                      <span className="text-gray-700">Select Tier &#9660;</span>
                    )}
                  </span>
                </div>

                {isDropdownOpen && (
                  <div className="scrollbar-custom tier-dropdown-menu absolute z-[100000000] ml-[2vw] max-h-[7em] w-[7em] overflow-y-auto rounded-md bg-[#333] text-[1.3em] shadow-lg">
                    {tiers.map((tier) => (
                      <div
                        key={tier.id}
                        className="tier-option cursor-pointer px-[0.5em] py-[0.4em] text-center"
                        style={{ color: tierColors.lol_color[tier.id] }}
                        onClick={() => {
                          handlePlayerChange("tier", tier.id);
                          setDropdownOpen(false);
                        }}
                      >
                        {tier.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : isLgView ? (
              <div className="ml-3 mt-3 flex-col">
                <div className="flex justify-start">
                  {tiers.slice(0, 5).map((tier) => (
                    <div className="tier" key={tier.id}>
                      <input
                        id={`player${playerNum}-${tier.id}`}
                        className="players__input-tier"
                        name={`player${playerNum}-tier`}
                        value={tier.id}
                        type="radio"
                        checked={playerData.tier === tier.id}
                        onChange={(e) =>
                          handlePlayerChange("tier", e.target.value)
                        }
                      />
                      <label
                        htmlFor={`player${playerNum}-${tier.id}`}
                        className="players__tiers flex items-center text-center text-[3.5vh]"
                        style={{ color: tierColors.lol_color[tier.id] }}
                      >
                        {tier.label}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-start">
                  {tiers.slice(5).map((tier) => (
                    <div className="tier" key={tier.id}>
                      <input
                        id={`player${playerNum}-${tier.id}`}
                        className="players__input-tier"
                        name={`player${playerNum}-tier`}
                        value={tier.id}
                        type="radio"
                        checked={playerData.tier === tier.id}
                        onChange={(e) =>
                          handlePlayerChange("tier", e.target.value)
                        }
                      />
                      <label
                        htmlFor={`player${playerNum}-${tier.id}`}
                        className="players__tiers flex items-center text-center text-[3.5vh]"
                        style={{ color: tierColors.lol_color[tier.id] }}
                      >
                        {tier.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              tiers.map((tier) => (
                <div className="tier" key={tier.id}>
                  <input
                    id={`player${playerNum}-${tier.id}`}
                    className="players__input-tier"
                    name={`player${playerNum}-tier`}
                    value={tier.id}
                    type="radio"
                    checked={playerData.tier === tier.id}
                    onChange={(e) => handlePlayerChange("tier", e.target.value)}
                  />
                  <label
                    htmlFor={`player${playerNum}-${tier.id}`}
                    className="players__tiers flex items-center text-center text-[2em]"
                    style={{ color: tierColors.lol_color[tier.id] }}
                  >
                    {tier.label}
                  </label>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
});

export default PlayerLol;
