import Sidebar from "./Sidebar";
import logo from "../components/logo2.jpg";
import { useState } from "react";
import { MdLanguage } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Header({ selectedGame, setSelectedGame, isKorean, toggleLanguage }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleGame = (event) => {
    const game = event.target.value;
    setSelectedGame(game);
    if (game === "LeagueOfLegends") {
      navigate("/leagueOfLegends");
    } else if (game === "Valorant") {
      navigate("/valorant");
    }
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
    <div className="header fixed left-0 top-0 z-[1000] flex h-[6vh] w-full items-center justify-between bg-black bg-opacity-90 p-0">
      {/* 햄버거 */}
      <div className="flex">
        <button
          className="ml-[1rem] flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[0.5rem] bg-transparent"
          onClick={toggleSidebar}
        >
          <span className="text-[2.3rem] font-thin">☰</span>
        </button>
        <div
          onClick={() => navigate("/")}
          className="flex items-center justify-center cursor-pointer header__title"
        >
          <img className="ml-[1rem] w-[1.7rem]" src={logo} alt="Logo" />
          <span className="ml-[.7rem] mt-[0.2rem] hidden text-[2.3rem] leading-none xs:inline">
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

      <div className="items-center hidden md:flex">
        <div className="mr-[1rem] flex items-center space-x-1 text-[2vh]">
          <MdLanguage size={20} />
          <div className="flex">
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
              KOR
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
              ENG
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
