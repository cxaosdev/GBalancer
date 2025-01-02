import logo from "../components/logo2.jpg";
import { BsPeople } from "react-icons/bs";
import { CiMap } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function Sidebar({
  isSidebarOpen,
  toggleSidebar,
  selectedGame,
  handleGame,
  isKorean,
  selectLanguage,
}) {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
    toggleSidebar();
  };
  return (
    <div
      className={`fixed left-0 top-0 z-[1100] h-full w-[21rem] bg-black bg-opacity-90 text-white transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <button
          onClick={toggleSidebar}
          className="absolute right-[2rem] top-[1rem] text-[3rem]"
        >
          &times;
        </button>
      </div>
      <img className="ml-[2rem] w-[2rem]" src={logo} alt="Logo" />
      <ul className="space-y-3 p-[1rem] pt-[3rem]">
        <li
          onClick={() => handleGame({ target: { value: "LeagueOfLegends" } })}
          className={`cursor-pointer rounded px-4 py-2 text-[1.5rem] hover:bg-gray-800 ${isKorean ? "do-hyeon-regular" : ""}`}
        >
          <span className="flex items-center">
            <BsPeople className="mr-[.5rem]" />
            {isKorean ? "리그 오브 레전드 팀 구성" : "League Team Balancer"}
          </span>
        </li>
        <li
          onClick={() => handleGame({ target: { value: "Valorant" } })}
          className={`cursor-pointer rounded px-4 py-2 text-[1.5rem] hover:bg-gray-800 ${isKorean ? "do-hyeon-regular" : ""} ${isKorean ? "do-hyeon-regular" : ""}`}
        >
          <span className="flex items-center">
            <BsPeople className="mr-[.5rem]" />
            {isKorean ? "발로란트 팀 구성" : "Valorant Team Balancer "}
          </span>
        </li>
        <li
          onClick={() => handleNavigate("/maps")}
          className={`cursor-pointer rounded px-4 py-2 text-[1.5rem] hover:bg-gray-800 ${isKorean ? "do-hyeon-regular" : ""}`}
        >
          <span className="flex items-center">
            <CiMap className="mr-[.5rem]" />
            {isKorean ? "발로란트 랜덤 맵" : "Valorant random map"}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
