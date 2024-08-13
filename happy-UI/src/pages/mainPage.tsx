import { useCallback, useEffect, useRef } from "react";
import { Home } from "./homePage";

export const RootLayout = () => {
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

  return (
    <>
      <div ref={fullScreen} className="h-screen">
        <Home />
      </div>
    </>
  );
};
