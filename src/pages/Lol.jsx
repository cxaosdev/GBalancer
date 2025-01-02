import PlayerLol from "components/PlayerLol.jsx";
import ResultModalLol from "components/ResultModalLol.jsx";
import Spinner from "components/Spinner.jsx";
import WarningModal from "../components/WarningModal.jsx";
import l1 from "../assets/league of legends/lol_background.webp";
import l2 from "../assets/league of legends/c-o-project-hunters-login.webp";
import l3 from "../assets/league of legends/c-o-videostill-getjinxed-10.webp";
import l4 from "../assets/league of legends/c-o-videostill-projecthunters-22.webp";
import l5 from "../assets/league of legends/c-o-war-2020-01.webp";
import l6 from "../assets/league of legends/lol_T12023.webp";
import l7 from "../assets/league of legends/c-o-war-2020-02.webp";
import l8 from "../assets/league of legends/war-2020-04.webp";
import { generateLolTeams } from "../util/teamGenerator.js";
import { tierToPoints_lol } from "../util/tierPoints.js";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";

const players = Array.from({ length: 10 }, (_, index) => `Player ${index + 1}`);

const backgroundImages = [l1, l2, l3, l4, l5, l6, l7, l8];
export default function Lol() {
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
      selectedLanes: [],
    })),
  );

  const [teams, setTeams] = useState({
    team1: [],
    team1Pts: 0,
    team2: [],
    team2Pts: 0,
    missingPositions: [],
    insufficientPositions: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  const generateShareableLink = () => {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const queryParams = playerData
      .map((player, index) => {
        const playerName = encodeURIComponent(player.playerName);
        const tier = encodeURIComponent(player.tier);
        const lanes = encodeURIComponent(player.selectedLanes.join(","));
        return `player${index}=name:${playerName},tier:${tier},lanes:${lanes}`;
      })
      .join("&");

    const shareableLink = `${baseUrl}?${queryParams}&isModalOpen=true`;
    navigator.clipboard.writeText(shareableLink);
    return shareableLink;
  };

  const handlePlayerChange = useCallback((index, field, value, checked) => {
    setPlayerData((prev) => {
      const updatedPlayers = [...prev];
      if (field === "selectedLanes") {
        const currentLanes = new Set(updatedPlayers[index].selectedLanes || []);
        checked ? currentLanes.add(value) : currentLanes.delete(value);
        updatedPlayers[index] = {
          ...updatedPlayers[index],
          selectedLanes: Array.from(currentLanes),
        };
      } else {
        updatedPlayers[index] = {
          ...updatedPlayers[index],
          [field]: value,
        };
        if (field === "tier") {
          updatedPlayers[index].pts = tierToPoints_lol[value] || 0;
        }
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

  const handleGenerateSpinner = (players) => {
    setShowSpinner(true);
    const id = setTimeout(() => {
      const teams = generateLolTeams(players);
      setTeams(teams);
      setShowSpinner(false);
      setIsModalOpen(true);
    }, 500);
    setTimerId(id);
  };

  const handleContinueWithDefaults = () => {
    const updatedPlayers = playerData.map((player, index) => ({
      playerName: player.playerName || `Player ${index + 1}`,
      tier: player.tier || "Iron",
      pts: tierToPoints_lol[player.tier || "Iron"],
      selectedLanes: player.selectedLanes.length ? player.selectedLanes : [],
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newPlayerData = players.map((_, index) => {
      const param = params.get(`player${index}`);
      if (param) {
        const [name, tier, lanes] = param
          .split(",")
          .map((p) => p.split(":")[1]);
        return {
          playerName: decodeURIComponent(name || ""),
          tier: tier || "",
          pts: tierToPoints_lol[tier || "Iron"] || 0,
          selectedLanes: lanes ? lanes.split(",") : [],
        };
      }
      return { playerName: "", tier: "", pts: 0, selectedLanes: [] };
    });
    setPlayerData(newPlayerData);

    const isModalOpenParam = params.get("isModalOpen");
    if (isModalOpenParam === "true") {
      const generatedTeams = generateLolTeams(newPlayerData);
      setTeams(generatedTeams);
      setIsModalOpen(true);
    }
  }, []);

  return (
    <div
      className="scrollbar-custom page-container lol__container relative flex flex-col items-center overflow-y-auto pt-[9vh]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="mb-[8vh] mt-[3vh] flex flex-wrap items-center justify-center">
        {players.map((player, index) => (
          <PlayerLol
            key={player}
            playerNum={index + 1}
            playerData={playerData[index]}
            handlePlayerChange={(field, value, checked) =>
              handlePlayerChange(index, field, value, checked)
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

      <ResultModalLol
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
    </div>
  );
}
