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
      className={`fixed left-0 top-0 z-[1100] h-full w-[24rem] bg-black bg-opacity-90 text-white transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className="text-[2rem] font-bold">{isKorean ? "메뉴" : "Menu"}</h1>
        <button onClick={toggleSidebar} className="text-[3rem]">
          &times;
        </button>
      </div>
      <ul className="p-4 space-y-3">
        <li
          onClick={() => handleGame({ target: { value: "LeagueOfLegends" } })}
          className={`cursor-pointer rounded px-4 py-2 text-[1.5rem] hover:bg-gray-800 ${isKorean ? "do-hyeon-regular" : ""}`}
        >
          {isKorean ? "리그 오브 레전드 팀 구성" : "League Team Balancer"}
        </li>
        <li
          onClick={() => handleGame({ target: { value: "Valorant" } })}
          className={`cursor-pointer rounded px-4 py-2 text-[1.5rem] hover:bg-gray-800 ${isKorean ? "do-hyeon-regular" : ""} ${isKorean ? "do-hyeon-regular" : ""}`}
        >
          {isKorean ? "발로란트 팀 구성" : "Valorant Team Balancer "}
        </li>
        <li
          onClick={() => handleNavigate("/maps")}
          className={`cursor-pointer rounded px-4 py-2 text-[1.5rem] hover:bg-gray-800 ${isKorean ? "do-hyeon-regular" : ""}`}
        >
          {isKorean ? "발로란트 랜덤 맵" : "Valorant random map"}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
