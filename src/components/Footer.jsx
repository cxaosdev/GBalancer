import { LiaGithub } from "react-icons/lia";
import { VscFeedback } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <div className="do-hyeon-regular fixed bottom-0 left-0 z-[50] h-[5.5rem] w-full px-[0.6rem] text-[#515255]">
      <section className="bg-transparent w-100">
        <div className="flex justify-between bg-transparent pb-[0.2rem] pr-[0.8rem]">
          <div className="pt-7 text-[1.2rem] text-white/80">Game Balancer</div>
        </div>
        <section className="text-[0.9rem]">
          <div className="flex w-[100%] justify-between">
            <nav className="flex flex-nowrap">
              <ul className="m-0 flex list-none flex-nowrap gap-0 space-x-[1.5rem] p-0">
                <li
                  className="cursor-pointer text-white/80 hover:text-gray-400"
                  onClick={() => navigate("/LeagueOfLegends")}
                >
                  League of Legends
                </li>
                <li
                  className="cursor-pointer text-white/80 hover:text-gray-400"
                  onClick={() => navigate("/Valorant")}
                >
                  Valorant
                </li>
                <li
                  className="mb-[1rem] cursor-pointer text-white/80 hover:text-gray-400"
                  onClick={() => navigate("/maps")}
                >
                  Random Map
                </li>
              </ul>
            </nav>
            <div className="fixed bottom-0 right-[1rem] flex items-end text-[1rem]">
              <div className="flex items-center text-white/80">
                <VscFeedback />
                <span className="ml-1 text-white/80">scy0723123@gmail.com</span>
              </div>
              <a
                href="https://github.com/cxaosdev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center mt-1 ml-1 text-white/80">
                  <LiaGithub className="text-[1.2rem]" />
                  <span className="ml-1 cursor-pointer text-white/80 hover:text-amber-600">
                    cxaosdev
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
