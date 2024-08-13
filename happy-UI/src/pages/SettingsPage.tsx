import { SettingOutlined } from "@ant-design/icons";
import Navbar from "../components/startpage_component/navbar_start";
import { Button } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { AudioSetting } from "../components/Settings_component/Audio_setting";
import { ProfileSetting } from "../components/Settings_component/Profile_setting";

export const SettingsPage = () => {
  const [selectedDiv, setSelectedDiv] = useState<number | null>(1);
  const [isAudio, setIsAudio] = useState<boolean>(true);
  const [Title, setTitle] = useState<string>("Audio");
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
  const handleDivClick = (divNumber: number) => {
    setSelectedDiv(divNumber);
  };

  return (
    <>
      <div ref={enterFullscreen} className="bg-setting_bg bg-cover bg-no-repeat h-screen">
        <Navbar />
        <div className="w-full flex items-center h-full justify-center text-white">
          <div className="w-3/4 h-2/3 border-4 px-3 border-solid border-corail rounded-lg backdrop-opacity-10 backdrop-invert bg-black/30">
            <div className="flex gap-2">
              <h3 className="flex flex-row gap-3 w-1/4">
                <SettingOutlined />
                Einstellungen
              </h3>
              <div className="w-3/4 flex items-center justify-center">
                <h4>{Title}</h4>
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-center">
              <div className="w-1/4 flex flex-col gap-6">
                <div
                  onClick={() => {
                    handleDivClick(1);
                    setIsAudio(true);
                    setTitle("Audio");
                  }}
                  className={`${selectedDiv === 1 ? "bg-gradient-to-t from-corail" : ""}`}
                >
                  Audio
                </div>
                <div
                  onClick={() => {
                    handleDivClick(2);
                    setIsAudio(false);
                    setTitle("Profile");
                  }}
                  className={`${selectedDiv === 2 ? "bg-gradient-to-t from-corail" : ""}`}
                >
                  Profile
                </div>
              </div>
              <div className="w-1/2 h-1/4 flex flex-col items-center justify-center">
                {isAudio ? <AudioSetting /> : <ProfileSetting />}
              </div>
            </div>

            <div className="flex flex-row mt-6 relative h-1/4">
              <div className="absolute bottom-0 left-0">
                <Button>Standard wiederherstellen</Button>
              </div>
              <div className="flex flex-row gap-2 absolute bottom-0 right-0">
                <Button danger>Abbrechen</Button>
                <Button type="primary">Annehmen</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
