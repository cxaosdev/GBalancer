import JettJump from "../assets/valorant/China_CG_Jett_Jump_Full.webp";
import PhxCool from "../assets/valorant/China_CG_phxcool_fullres.webp";
import React, { useEffect, useMemo, useState } from "react";
import SageFire from "../assets/valorant/China_CG_Sagefire_Full.webp";
import Valorant2 from "../assets/valorant/Valorant2.webp";
import ValorantTeaser from "../assets/valorant/Valorant_EP-8-Teaser_The-arrival.webp";
import VlrtBackground from "../assets/valorant/vlrt_background.webp";
import axios from "axios";

const backgroundImages = [
  VlrtBackground,
  Valorant2,
  JettJump,
  PhxCool,
  SageFire,
  ValorantTeaser,
];

export default function VlrtRandomAgent() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [excludedAgents, setExcludedAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const backgroundImage = useMemo(() => {
    return backgroundImages[
      Math.floor(Math.random() * backgroundImages.length)
    ];
  }, [backgroundImages]);

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setIsImageLoaded(true);
  }, [backgroundImage]);

  const [characters, setCharacters] = useState([]);

  const toggleAgent = (agentName) => {
    setExcludedAgents((prev) =>
      prev.includes(agentName)
        ? prev.filter((name) => name !== agentName)
        : [...prev, agentName],
    );
  };

  const getRandomAgent = () => {
    const availableAgents = characters.filter(
      (character) => !excludedAgents.includes(character.displayName),
    );
    if (availableAgents.length === 0) {
      alert("선택 가능한 요원이 없습니다.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * availableAgents.length);
    setSelectedAgent(availableAgents[randomIndex]);
  };

  const closeModal = (e) => {
    if (e.target.id === "modal-background") {
      setSelectedAgent(null);
    }
  };

  useEffect(() => {
    const fetchRiotData = async () => {
      try {
        const url = "https://valorant-api.com/v1/agents";
        const response = await axios.get(url, {
          params: { isPlayableCharacter: true },
        });
        console.log(response.data);
        setCharacters(response.data.data || []);
        console.log(characters);
      } catch (error) {
        if (error.response) {
          console.error(
            `Error ${error.response.status}: ${error.response.statusText}`,
          );
        } else if (error.request) {
          console.error("No response received from the server.", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
      }
    };
    fetchRiotData();
  }, []);

  return (
    <div
      className="scrollbar-custom page-container lol__container relative flex flex-col items-center overflow-y-auto pt-[9vh]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <h1 className="mb-[4vh] mt-[4vh] text-center text-[3.5rem] font-bold">
        Random Agent Selector
      </h1>
      <div className="flex items-center justify-center">
        <div className="flex w-[76rem] flex-wrap justify-center gap-4">
          {characters.map((character) => (
            <div
              key={character.id}
              className="relative overflow-hidden transition-transform duration-300 rounded-md shadow-md cursor-pointer hover:scale-105"
              onClick={() => toggleAgent(character.displayName)}
            >
              <img
                src={character.killfeedPortrait}
                alt={character.displayName}
                className={`h-[5.5rem] w-[12rem] object-cover transition duration-300 ${
                  excludedAgents.includes(character.displayName)
                    ? "brightness-75 grayscale"
                    : "brightness-110 saturate-150"
                }`}
              />
              <div
                className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent text-center text-[1.8rem] font-semibold ${
                  excludedAgents.includes(character.displayName)
                    ? "text-zinc-300/"
                    : "text-white"
                }`}
              >
                {character.displayName}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={getRandomAgent}
        className="sparkle mt-[3.5rem] flex items-center justify-center rounded-md bg-gradient-to-r from-rose-800 to-amber-700 px-4 py-2 text-[30px] text-white shadow-rose-900/50 hover:from-rose-700 hover:to-amber-600 hover:shadow-rose-900/70 focus:ring-2 active:from-rose-900 active:to-amber-800 active:outline-none active:ring-rose-700 active:ring-offset-2"
      >
        Generate Random Agent
      </button>

      {selectedAgent && (
        <div
          id="modal-background"
          className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-70"
          onClick={closeModal}
        >
          <div
            className="relative flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedAgent.background}
              alt="Background"
              className="absolute left-0 top-0 h-[50%] w-[90%] rounded-lg object-cover opacity-50 shadow-lg"
              style={{
                transform: "translate(-50%, -30%)",
                top: "25%",
                left: "50%",
              }}
            />
            <img
              src={selectedAgent.fullPortrait}
              alt={selectedAgent.displayName}
              className="z-10 w-[40vw] max-w-xl rounded-lg shadow-2xl"
            />
            <h2
              className="z-10 text-[4rem] font-extrabold"
              style={{
                background: `linear-gradient(to bottom right, #${selectedAgent.backgroundGradientColors[0]}, #${selectedAgent.backgroundGradientColors[1]}, #${selectedAgent.backgroundGradientColors[2]}, #${selectedAgent.backgroundGradientColors[3]})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {selectedAgent.displayName}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
