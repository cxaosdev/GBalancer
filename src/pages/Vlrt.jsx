import JettJump from "../assets/valorant/China_CG_Jett_Jump_Full.webp";
import PhxCool from "../assets/valorant/China_CG_phxcool_fullres.webp";
import PlayerVlrt from "components/PlayerVlrt.jsx";
import ResultModalVlrt from "components/ResultModalVlrt.jsx";
import SageFire from "../assets/valorant/China_CG_Sagefire_Full.webp";
import Spinner from "components/Spinner.jsx";
import Valorant2 from "../assets/valorant/Valorant2.webp";
import ValorantTeaser from "../assets/valorant/Valorant_EP-8-Teaser_The-arrival.webp";
import VlrtBackground from "../assets/valorant/vlrt_background.webp";
import WarningModal from "../components/WarningModal.jsx";
import { generateVlrtTeams } from "../util/teamGenerator.js";
import { tierToPoints_vlrt } from "../util/tierPoints.js";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";


const players = Array.from({ length: 10 }, (_, index) => `Player ${index + 1}`);

const backgroundImages = [
  VlrtBackground,
  Valorant2,
  JettJump,
  PhxCool,
  SageFire,
  ValorantTeaser,
];

export default function Vlrt() {
  const backgroundImage = useMemo(() => {
    return backgroundImages[
      Math.floor(Math.random() * backgroundImages.length)
    ];
  }, [backgroundImages]);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setIsImageLoaded(true);
  }, [backgroundImage]);

  const [playerData, setPlayerData] = useState(() =>
    players.map(() => ({
      playerName: "",
      tier: "",
      pts: 0,
    })),
  );

  const [teams, setTeams] = useState({
    team1: [],
    team1Pts: 0,
    team2: [],
    team2Pts: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const timerIdRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, []);

  const handlePlayerChange = useCallback(({ index, field, value }) => {
    setPlayerData((prev) => {
      const updatedPlayers = [...prev];
      updatedPlayers[index][field] = value;
      if (field === "tier") {
        updatedPlayers[index].pts = tierToPoints_vlrt[value] || 0;
      }
      return updatedPlayers;
    });
  }, []);

  const handleGenerateTeams = () => {
    const isAnyFieldEmpty = playerData.some(
      (player) => !player.playerName || !player.tier,
    );

    if (isAnyFieldEmpty) {
      setIsWarningModalOpen(true);
    } else {
      handleGenerateSpinner(playerData);
    }
  };

  const handleGenerateSpinner = useCallback((players) => {
    setShowSpinner(true);
    timerIdRef.current = setTimeout(() => {
      const teams = generateVlrtTeams(players);
      setTeams(teams);
      setShowSpinner(false);
      setIsModalOpen(true);
    }, 500);
  }, []);

  const handleContinueWithDefaults = () => {
    const updatedPlayers = playerData.map((player, index) => ({
      playerName: player.playerName || `Player ${index + 1}`,
      tier: player.tier || "Iron",
      pts: tierToPoints_vlrt[player.tier || "Iron"],
    }));

    setPlayerData(updatedPlayers);
    setIsWarningModalOpen(false);
    handleGenerateSpinner(updatedPlayers);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseWarningModal = () => {
    setIsWarningModalOpen(false);
  };

  const generateShareableLink = () => {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const queryParams = playerData
      .map((player, index) => {
        const playerName = encodeURIComponent(player.playerName);
        const tier = encodeURIComponent(player.tier);
        return `player${index}=name:${playerName},tier:${tier}`;
      })
      .join("&");

    const shareableLink = `${baseUrl}?${queryParams}&isModalOpen=true`;
    navigator.clipboard.writeText(shareableLink);

    return shareableLink;
  };

  const bottomRef = useRef(null);
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newPlayerData = players.map((_, index) => {
      const param = params.get(`player${index}`);
      if (param) {
        const [name, tier] = param.split(",").map((p) => p.split(":")[1]);
        return {
          playerName: decodeURIComponent(name || ""),
          tier: tier || "",
          pts: tierToPoints_vlrt[tier || "Iron"] || 0,
        };
      }
      return { playerName: "", tier: "", pts: 0 };
    });
    setPlayerData(newPlayerData);

    const isModalOpenParam = params.get("isModalOpen");
    if (isModalOpenParam === "true") {
      const generatedTeams = generateVlrtTeams(newPlayerData);
      setTeams(generatedTeams);
      setIsModalOpen(true);
    }
  }, []);

  return (
    <>
      <div
        className="scrollbar-custom page-container lol__container relative flex flex-col items-center overflow-y-auto pt-[9vh]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="mt-[3vh] flex flex-col flex-wrap items-center justify-center">
          {players.map((_, index) => (
            <PlayerVlrt
              key={index}
              playerNum={index + 1}
              playerName={playerData[index].playerName}
              selectedTier={playerData[index].tier}
              handlePlayerChange={(field, value) =>
                handlePlayerChange({ index, field, value })
              }
            />
          ))}
        </div>
        <div className="z-[10000] mb-[1.3rem] mt-[0.4rem] flex justify-center bg-transparent">
          <button
            className="sparkle fixed bottom-[4.5vh] mt-[2vh] flex h-[6vh] items-center justify-center rounded-md bg-gradient-to-r from-rose-800 to-amber-700 px-4 py-2 text-[30px] text-white shadow-rose-900/50 hover:from-rose-700 hover:to-amber-600 hover:shadow-rose-900/70 focus:ring-2 active:from-rose-900 active:to-amber-800 active:outline-none active:ring-rose-700 active:ring-offset-2"
            style={{
              boxShadow:
                "0px 0px 10px rgba(255, 255, 255, 0.4), 4px 4px 40px rgba(0, 0, 0, 0.2)",
            }}
            onClick={handleGenerateTeams}
            disabled={showSpinner}
          >
            {showSpinner && <Spinner />}
            <span className={showSpinner ? "ml-2" : ""}>
              Generate Fair Match!
            </span>
          </button>
        </div>

        <div className="fixed right-[20px] top-1/2 mt-6 flex -translate-y-1/2 transform flex-col items-center">
          <button
            className="flex flex-col items-center cursor-pointer"
            onClick={scrollToBottom}
          >
            <span
              className="do-hyeon-regular mb-2 transform animate-pulse whitespace-nowrap text-[3vh] text-white"
              style={{ writingMode: "vertical-rl" }}
            >
              If you're done, "Generate Fair Game" 〉
            </span>
          </button>
        </div>

        <ResultModalVlrt
          isOpen={isModalOpen}
          teams={teams}
          onClose={handleCloseModal}
          generateShareableLink={generateShareableLink}
        />

        {isWarningModalOpen && (
          <WarningModal
            onClose={handleCloseWarningModal}
            onContinue={handleContinueWithDefaults}
          />
        )}
        <div ref={bottomRef} className="mb-[10vh]"></div>
      </div>
    </>
  );
}
