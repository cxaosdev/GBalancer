import Footer from "components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import JettJump from "./assets/valorant/China_CG_Jett_Jump_Full.webp";
import Lol from "./pages/Lol";
import PhxCool from "./assets/valorant/China_CG_phxcool_fullres.webp";
import SageFire from "./assets/valorant/China_CG_Sagefire_Full.webp";
import UnsupportedPage from "./pages/UnsupportedPage";
import Valorant2 from "./assets/valorant/Valorant2.webp";
import ValorantTeaser from "./assets/valorant/Valorant_EP-8-Teaser_The-arrival.webp";
import Vlrt from "./pages/Vlrt";
import VlrtBackground from "./assets/valorant/vlrt_background.webp";
import VlrtRandomAgent from "./pages/VlrtRandomAgent";
import VlrtRandomMap from "./pages/VlrtRandomMap";
import l1 from "./assets/league of legends/lol_background.webp";
import l2 from "./assets/league of legends/c-o-project-hunters-login.webp";
import l3 from "./assets/league of legends/c-o-videostill-getjinxed-10.webp";
import l4 from "./assets/league of legends/c-o-videostill-projecthunters-22.webp";
import l5 from "./assets/league of legends/c-o-war-2020-01.webp";
import l6 from "./assets/league of legends/lol_T12023.webp";
import l7 from "./assets/league of legends/c-o-war-2020-02.webp";
import l8 from "./assets/league of legends/war-2020-04.webp";
import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MOBILE_OR_TABLET_REGEX } from "./util/mobileRegex";

const preloadImages = [
  l1,
  l2,
  l3,
  l4,
  l5,
  l6,
  l7,
  l8,
  VlrtBackground,
  Valorant2,
  JettJump,
  PhxCool,
  SageFire,
  ValorantTeaser,
];

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isKorean, setIsKorean] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(MOBILE_OR_TABLET_REGEX.test(navigator.userAgent.toLowerCase()));
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const toggleLanguage = useCallback(() => setIsKorean((prev) => !prev), []);

  if (isMobile) {
    return (
      <BrowserRouter>
        <UnsupportedPage />
      </BrowserRouter>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden root-wrap">
      <BrowserRouter>
        <Header
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
          isKorean={isKorean}
          toggleLanguage={toggleLanguage}
        />
        <div className="flex flex-col flex-1 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  selectedGame={selectedGame}
                  setSelectedGame={setSelectedGame}
                  isKorean={isKorean}
                />
              }
            />
            <Route path="/leagueOfLegends" element={<Lol />} />
            <Route path="/valorant" element={<Vlrt />} />
            <Route path="/maps" element={<VlrtRandomMap />} />
            <Route path="/agents" element={<VlrtRandomAgent />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
