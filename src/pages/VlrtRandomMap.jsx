import Abyss from "../assets/maps/abyss.webp";
import Ascent from "../assets/maps/ascent.webp";
import Bind from "../assets/maps/bind.webp";
import Breeze from "../assets/maps/breeze.webp";
import Fracture from "../assets/maps/fracture.webp";
import Haven from "../assets/maps/haven.webp";
import Icebox from "../assets/maps/icebox.webp";
import JettJump from "../assets/valorant/China_CG_Jett_Jump_Full.webp";
import Lotus from "../assets/maps/lotus.webp";
import Pearl from "../assets/maps/pearl.webp";
import PhxCool from "../assets/valorant/China_CG_phxcool_fullres.webp";
import React, { useEffect, useMemo, useState } from "react";
import SageFire from "../assets/valorant/China_CG_Sagefire_Full.webp";
import Split from "../assets/maps/split.webp";
import Sunset from "../assets/maps/sunset.webp";
import Valorant2 from "../assets/valorant/Valorant2.webp";
import ValorantTeaser from "../assets/valorant/Valorant_EP-8-Teaser_The-arrival.webp";
import VlrtBackground from "../assets/valorant/vlrt_background.webp";

const maps = [
  { name: "Abyss", src: Abyss },
  { name: "Ascent", src: Ascent },
  { name: "Bind", src: Bind },
  { name: "Breeze", src: Breeze },
  { name: "Fracture", src: Fracture },
  { name: "Haven", src: Haven },
  { name: "Icebox", src: Icebox },
  { name: "Lotus", src: Lotus },
  { name: "Pearl", src: Pearl },
  { name: "Split", src: Split },
  { name: "Sunset", src: Sunset },
];

const backgroundImages = [
  VlrtBackground,
  Valorant2,
  JettJump,
  PhxCool,
  SageFire,
  ValorantTeaser,
];

export default function VlrtRandomMap() {
  const [excludedMaps, setExcludedMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

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

  const toggleMap = (mapName) => {
    setExcludedMaps((prev) =>
      prev.includes(mapName)
        ? prev.filter((name) => name !== mapName)
        : [...prev, mapName],
    );
  };

  const getRandomMap = () => {
    const availableMaps = maps.filter(
      (map) => !excludedMaps.includes(map.name),
    );
    if (availableMaps.length === 0) {
      alert("선택 가능한 맵이 없습니다.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * availableMaps.length);
    setSelectedMap(availableMaps[randomIndex]);
  };

  const closeModal = (e) => {
    // 모달 외부
    if (e.target.id === "modal-background") {
      setSelectedMap(null);
    }
  };

  return (
    <div
      className="scrollbar-custom page-container lol__container relative flex flex-col items-center overflow-y-auto pt-[9vh]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <h1 className="mt-[4vh] text-center text-[3.5rem] font-bold">
        Random Map Selector
      </h1>
      <h1 className="mb-[4vh] text-center text-[2rem] font-bold">
        Click on maps to ban!
      </h1>
      <div className="flex items-center justify-center">
        <div className="flex w-[56rem] flex-wrap justify-center gap-4">
          {maps.map((map) => (
            <div
              key={map.name}
              className="relative cursor-pointer overflow-hidden rounded-md shadow-md transition-transform duration-300 hover:scale-105"
              onClick={() => toggleMap(map.name)}
            >
              <img
                src={map.src}
                alt={map.name}
                className={`h-[8rem] w-[12rem] object-cover transition duration-300 ${
                  excludedMaps.includes(map.name)
                    ? "brightness-75 grayscale"
                    : "brightness-110 saturate-150"
                }`}
              />
              <div
                className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent text-center text-[2.2rem] font-semibold ${
                  excludedMaps.includes(map.name)
                    ? "text-zinc-300/80"
                    : "text-white/80"
                }`}
              >
                {map.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={getRandomMap}
        className="sparkle mt-[3.5rem] flex items-center justify-center rounded-md bg-gradient-to-r from-rose-800 to-amber-700 px-4 py-2 text-[30px] text-white shadow-rose-900/50 hover:from-rose-700 hover:to-amber-600 hover:shadow-rose-900/70 focus:ring-2 active:from-rose-900 active:to-amber-800 active:outline-none active:ring-rose-700 active:ring-offset-2"
      >
        Generate Random Map
      </button>

      {selectedMap && (
        <div
          id="modal-background"
          className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70"
          onClick={closeModal}
        >
          <div
            className="flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()} // 내부 클릭 이벤트 방지
          >
            <img
              src={selectedMap.src}
              alt={selectedMap.name}
              className="w-[60vw] max-w-2xl rounded-lg shadow-2xl"
            />
            <h2 className="mb-4 mt-4 text-[4rem] font-bold text-white">
              {selectedMap.name}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
