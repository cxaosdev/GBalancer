import { FaGithub, FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  const navigate = useNavigate();

  return (
    <div className="do-hyeon-regular fixed bottom-0 left-0 z-[50] h-[5.5rem] w-full px-[0.6rem] text-[#515255]">
      <section className="w-100 bg-transparent pt-[0.4rem]">
        <div className="flex justify-between bg-transparent pb-[0.2rem] pr-[0.8rem]">
          <div className="text-[1.2rem] text-white/80">Game Balancer</div>
        </div>
        <section className="text-[0.9rem]">
          <div className="flex w-[100%] justify-between">
            <nav className="flex footer__nav flex-nowrap">
              <ul className="flex flex-col gap-0 p-0 m-0 list-none flex-nowrap">
                <li
                  className="cursor-pointer text-white/80"
                  onClick={() => navigate("/LeagueOfLegends")}
                >
                  League of Legends 〉
                </li>
                <li
                  className="mb-[1rem] cursor-pointer text-white/80"
                  onClick={() => navigate("/Valorant")}
                >
                  Valorant 〉
                </li>
              </ul>
            </nav>
            <div className="fixed bottom-0 right-[2rem] flex items-end text-[1rem]">
              <div className="flex items-center text-white/80">
                <FaPhoneAlt />
                <span className="text-white/80">
                  &nbsp;Contact: scy0723123@gmail.com &nbsp;
                </span>
              </div>
              <div className="flex items-center mt-1 text-white/80">
                <FaGithub />
                <span className="ml-2 cursor-pointer text-white/80 hover:text-indigo-500">
                  cxaosdev
                </span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
