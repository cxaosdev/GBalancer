import Footer from "components/Footer";
import React from "react";
import logo from "../components/logo2.jpg";
import { FaGithub, FaPhoneAlt } from "react-icons/fa";

const UnsupportedPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900 do-hyeon-regular">
        <img className="ml-[1.5rem] w-[2.2rem]" src={logo} alt="Logo" />
        <h1 className="mt-8 text-lg">
          모바일 및 태블릿 기기에서는 지원하지 않습니다.
        </h1>
        <div className="fixed bottom-1 flex items-center text-[1rem]">
          <div className="flex items-center text-white/80">
            <FaPhoneAlt />
            <span className="text-white/80">
              &nbsp;Contact: scy0723123@gmail.com &nbsp;
            </span>
          </div>
          <div className="flex items-center text-white/80">
            <FaGithub />
            <span className="ml-2 cursor-pointer text-white/80">cxaosdev</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnsupportedPage;
