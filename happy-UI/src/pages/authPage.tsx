import { LogIn } from "../components/Auth_component/login";
import { Register } from "../components/Auth_component/register";
import { useCallback, useEffect, useRef, useState } from "react";
import { ImagesCaroussel } from "../components/caroussel/images_caroussel";

export const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const fullScreen = useRef<HTMLDivElement>(null);
  const enterFullscreen = useCallback(() => {
    if (fullScreen.current) {
      fullScreen.current.requestFullscreen();
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    enterFullscreen();
    return () => exitFullscreen();
  }, []);

  const toogleView = () => {
    setShowLogin(!showLogin);
  };
  return (
    <>
      <div ref={fullScreen} className="h-screen flex flex-col bg-white">
        <div className="h-full flex flex-row items-center justify-center">
          <div className="h-full w-1/4 flex items-center justify-center">
            <ImagesCaroussel />
          </div>
          <div
            className={`h-full flex items-center overflow-y-hidden overflow-y-scroll transition-all duration-300 ease-in-out delay-300`}
          >
            {showLogin ? <LogIn toogleView={toogleView} /> : <Register toogleView={toogleView} />}
          </div>
        </div>
        <div className="h-1/12"></div>
      </div>
    </>
  );
};
