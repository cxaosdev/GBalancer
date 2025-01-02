import Sidebar from "./Sidebar";
import logo from "../components/logo2.jpg";
import { useState } from "react";
import { MdLanguage } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Header({ selectedGame, setSelectedGame, isKorean, toggleLanguage }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleGame = (event) => {
    const game = event.target.value;
    setSelectedGame(game);
    if (game === "LeagueOfLegends") {
      navigate("/leagueOfLegends");
    } else if (game === "Valorant") {
      navigate("/valorant");
    }
    setIsMenuOpen(false);
    setIsSidebarOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const selectLanguage = (language) => {
    if ((language === "KR" && !isKorean) || (language === "EN" && isKorean)) {
      toggleLanguage();
    }
    setIsMenuOpen(false);
    setIsSidebarOpen(false);
  };

  return (
    <div className="header fixed left-0 top-0 z-[1000] flex h-[10vh] w-full items-center justify-between bg-black bg-opacity-70 p-0">
      {/* 햄버거 */}
      <div className="flex">
        <button
          className="ml-[1rem] flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[0.5rem] bg-transparent"
          onClick={toggleSidebar}
        >
          <span className="text-[2.5rem] font-thin">☰</span>
        </button>
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer header__title"
        >
          <img className="ml-[1rem] w-[2rem]" src={logo} alt="Logo" />
          <span className="ml-[1rem] mt-[0.2rem] hidden text-[2.5rem] leading-none xs:inline">
            Game Balancer
          </span>
        </div>
      </div>

      {/* 사이드바 */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        selectedGame={selectedGame}
        handleGame={handleGame}
        isKorean={isKorean}
        selectLanguage={selectLanguage}
      />

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="absolute left-0 top-[10vh] flex w-full flex-col items-center space-y-4 bg-black bg-opacity-90 p-4 md:hidden">
          <label
            onClick={() => handleGame({ target: { value: "LeagueOfLegends" } })}
            className={`font-new-amsterdam text-aliceblue cursor-pointer rounded-[25px] px-[15px] py-[5px] text-[27px] transition-colors duration-300 ${
              selectedGame === "LeagueOfLegends"
                ? "bg-amber-600 font-bold text-white"
                : "hover:text-amber-500"
            } ${isKorean ? "do-hyeon-regular" : ""}`}
          >
            {isKorean ? "리그 오브 레전드" : "League of Legends"}
          </label>
          <label
            onClick={() => handleGame({ target: { value: "Valorant" } })}
            className={`font-new-amsterdam text-aliceblue cursor-pointer rounded-[25px] px-[15px] py-[5px] text-[27px] transition-colors duration-300 ${
              selectedGame === "Valorant"
                ? "bg-red-800 font-bold text-white"
                : "hover:text-red-500"
            } ${isKorean ? "do-hyeon-regular" : ""}`}
          >
            {isKorean ? "발로란트" : "Valorant"}
          </label>
          <div className="flex items-center space-x-2 text-[2.5vh]">
            <MdLanguage size={24} />
            <div className="flex w-[60px] justify-between">
              <span
                onClick={() => selectLanguage("KR")}
                className={`${
                  isKorean ? "font-bold text-amber-600" : "text-white"
                } cursor-pointer`}
                style={{
                  textDecoration: "none",
                  width: "30px",
                  textAlign: "center",
                }}
              >
                KR
              </span>
              <span>/</span>
              <span
                onClick={() => selectLanguage("EN")}
                className={`${
                  !isKorean ? "font-bold text-amber-600" : "text-white"
                } cursor-pointer`}
                style={{
                  textDecoration: "none",
                  width: "30px",
                  textAlign: "center",
                }}
              >
                EN
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="items-center hidden md:flex">
        {/* <div className="header__game mb-[10px] ml-[30px] mt-[15px] flex items-center">
          <input
            id="toggle-on"
            value="LeagueOfLegends"
            type="radio"
            checked={selectedGame === "LeagueOfLegends"}
            onChange={handleGame}
            className="hidden"
          />
          <label
            htmlFor="toggle-on"
            className={`font-new-amsterdam text-aliceblue mr-[15px] inline-block cursor-pointer rounded-[25px] px-[15px] py-[5px] text-[1.6rem] transition-colors duration-300 ${
              selectedGame === "LeagueOfLegends"
                ? "bg-amber-600 font-bold text-white"
                : "hover:text-amber-500"
            } ${isKorean ? "do-hyeon-regular text-[2.7vh]" : ""}`}
          >
            {isKorean ? "리그 오브 레전드" : "League of Legends"}
          </label>
          <input
            id="toggle-off"
            value="Valorant"
            type="radio"
            checked={selectedGame === "Valorant"}
            onChange={handleGame}
            className="hidden"
          />
          <label
            htmlFor="toggle-off"
            className={`font-new-amsterdam text-aliceblue mr-[15px] inline-block cursor-pointer rounded-[25px] px-[15px] py-[5px] text-[1.6rem] transition-colors duration-300 ${
              selectedGame === "Valorant"
                ? "bg-red-800 font-bold text-white"
                : "hover:text-red-500"
            } ${isKorean ? "do-hyeon-regular text-[2.7vh]" : ""}`}
          >
            {isKorean ? "발로란트" : "Valorant"}
          </label>
        </div> */}
        <div className="mr-7 flex items-center space-x-2 text-[2.5vh]">
          <MdLanguage size={24} />
          <div className="flex w-[60px] justify-between">
            <span
              onClick={() => selectLanguage("KR")}
              className={`${
                isKorean ? "font-bold text-amber-600" : "text-white"
              } cursor-pointer no-underline`}
              style={{
                textDecoration: "none",
                width: "30px",
                textAlign: "center",
              }}
            >
              KR
            </span>
            <span>/</span>
            <span
              onClick={() => selectLanguage("EN")}
              className={`${
                !isKorean ? "font-bold text-amber-600" : "text-white"
              } cursor-pointer no-underline`}
              style={{
                textDecoration: "none",
                width: "30px",
                textAlign: "center",
              }}
            >
              EN
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
