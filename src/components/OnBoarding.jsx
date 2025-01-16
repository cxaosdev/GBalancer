import React, { useRef } from "react";
import random_agent1 from "../assets/ScreenShots/random_agent1.png";
import random_agent2 from "../assets/ScreenShots/random_agent2.png";
import random_map1 from "../assets/ScreenShots/random_map1.png";
import random_map2 from "../assets/ScreenShots/random_map2.png";
import selectGame from "../assets/ScreenShots/screenshot_select_game.png";
import selectLane from "../assets/ScreenShots/screenshot_lol.png";
import selectTier from "../assets/ScreenShots/screenshot_val.png";
import { BsPeople } from "react-icons/bs";
import { CiMap } from "react-icons/ci";
import { GiSkills } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export default function Onboarding({ isKorean }) {
  const navigate = useNavigate();

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const handleNext = () => {
    navigate("/home");
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-center gap-4 pt-[5rem]">
        <button
          onClick={() => scrollToSection(section1Ref)}
          className="sparkle do-hyeon-regular flex h-[6vh] w-[12rem] cursor-pointer items-center justify-center space-x-1 rounded-md bg-white/20 px-4 py-2 text-xl text-white shadow-md hover:bg-white/40"
        >
          <BsPeople />
          <span>{isKorean ? "팀 밸런서" : "Team Balancer"}</span>
        </button>
        <button
          onClick={() => scrollToSection(section2Ref)}
          className="sparkle do-hyeon-regular flex h-[6vh] w-[12rem] cursor-pointer items-center justify-center space-x-1 rounded-md bg-white/20 px-4 py-2 text-xl text-white shadow-md hover:bg-white/40"
        >
          <CiMap />
          <span>{isKorean ? "발로란트 랜덤 맵" : "Random Map"}</span>
        </button>
        <button
          onClick={() => scrollToSection(section3Ref)}
          className="sparkle do-hyeon-regular flex h-[6vh] w-[12rem] cursor-pointer items-center justify-center space-x-1 rounded-md bg-white/20 px-4 py-2 text-xl text-white shadow-md hover:bg-white/40"
        >
          <GiSkills />
          <span>{isKorean ? "발로란트 랜덤 요원" : "Random Agent"}</span>
        </button>
      </div>
      <div
        ref={section1Ref}
        className="mt-[3rem] flex w-[45rem] flex-col items-center justify-center rounded-xl bg-black bg-opacity-70"
      >
        <div className="mb-8 pt-[4rem]">
          <div className="flex items-center justify-center space-x-2 text-4xl do-hyeon-regular">
            <BsPeople />
            <span>{isKorean ? "팀 밸런서" : "Team Balancer"}</span>
          </div>
          <ol className="do-hyeon-regular mx-auto my-[3rem] flex max-w-md list-inside list-decimal flex-wrap gap-y-5 text-left">
            <li className="mb-3 text-2xl">
              {isKorean ? "게임을 선택하세요." : "Select your game."}
              <img className="my-[1rem]" src={selectGame} alt="" />
            </li>
            <li className="mb-3 text-2xl">
              {isKorean
                ? "플레이어들의 포지션과 티어를 입력하세요."
                : "Enter players' ranks and lanes."}
              <br />
              <span className="block text-lg text-gray-400">
                {isKorean
                  ? "✔︎ 티어를 입력하지 않은 플레이어는 최하위 티어로 계산됩니다."
                  : "✔︎ Players without a specified tier will be assigned the lowest tier by default. "}
              </span>
              <span className="text-lg text-gray-400">
                {isKorean
                  ? "✔︎ 리그 오브 레전드: 플레이어가 가능한 모든 포지션을 선택해야 합니다. 포지션 선택이 누락되면 팀 생성이 불가능합니다."
                  : "✔︎ League: all possible positions for each player must be selected. If any position is left unselected, the team generation cannot proceed."}
              </span>
              <img className="my-[1rem]" src={selectTier} alt="" />
              <img className="my-[1rem]" src={selectLane} alt="" />
            </li>
            <li className="mb-3 text-2xl">
              {isKorean
                ? "'Generate Fair Match!' 버튼을 클릭하여 결과를 확인하세요."
                : "Click 'Generate Fair Match!' to see the balanced match results."}
              <div className="flex justify-center w-full">
                <button className="sparkle New-Amsterdam mt-[2vh] flex h-[6vh] cursor-default items-center justify-center rounded-md bg-gradient-to-r from-rose-800 to-amber-700 px-4 py-2 text-[30px] text-white shadow-rose-900/50">
                  Generate Fair Match!
                </button>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <div
        ref={section2Ref}
        className="mt-[3rem] flex w-[45rem] flex-col items-center justify-center rounded-xl bg-black bg-opacity-70"
      >
        <div className="mb-[1rem] pt-[4rem]">
          <div className="flex items-center justify-center space-x-2 text-4xl do-hyeon-regular">
            <CiMap />
            <span>{isKorean ? "랜덤 맵" : "Random Map"}</span>
          </div>
          <ol className="do-hyeon-regular mx-auto my-[3rem] flex max-w-md list-inside flex-wrap gap-y-10 text-left">
            <li className="mb-3 text-2xl">
              <span className="block text-xl text-gray-400">
                {isKorean
                  ? "✔︎ 금지할 맵을 클릭하여 맵 풀에서 제외하세요"
                  : "✔︎ Click on maps to ban them from the map pool"}
              </span>
              <span className="text-xl text-gray-400">
                {isKorean
                  ? "✔︎ 버튼을 클릭해 랜덤 맵을 확인하세요."
                  : "✔︎ Then click the button to see a random map."}
              </span>
              <br />
              <img className="my-[1rem]" src={random_map1} alt="" />
              <img className="my-[1rem]" src={random_map2} alt="" />
            </li>
          </ol>
        </div>
      </div>
      <div
        ref={section3Ref}
        className="mb-[5rem] mt-[3rem] flex w-[45rem] flex-col items-center justify-center rounded-xl bg-black bg-opacity-70"
      >
        <div className="mb-8 pt-[4rem]">
          <div className="flex items-center justify-center space-x-2 text-4xl do-hyeon-regular">
            <CiMap />
            <span>{isKorean ? "랜덤 요원" : "Random Agent"}</span>
          </div>
          <ol className="do-hyeon-regular mx-auto my-[3rem] flex max-w-md list-inside flex-wrap gap-y-10 text-left">
            <li className="mb-3">
              <span className="block text-xl text-gray-400">
                {isKorean
                  ? "✔︎ 금지할 요원을 클릭하여 요원 풀에서 제외하세요"
                  : "✔︎ Click on agents to ban them from the agent pool"}
              </span>
              <span className="text-xl text-gray-400">
                {isKorean
                  ? "✔︎ 버튼을 클릭해 랜덤 요원을 확인하세요."
                  : "✔︎ Then click the button to see a random agent."}
              </span>

              <br />
              <img className="my-[1rem]" src={random_agent1} alt="" />
              <img className="my-[1rem]" src={random_agent2} alt="" />
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}
