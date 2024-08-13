import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AudioPlayerProps } from "../../interfaces/audioplayer.interface";
import ThemeService from "../../services/Theme.service";
import { ITheme } from "../../interfaces/Theme.interface";
import UserServices from "../../services/User.services";
import Navbar from "../startpage_component/navbar_start";
import { Modal, Spin } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import AudioPlayer from "../audio_player";

const ManualTheme: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [isVol, setIsVol] = useState<number>(0.3);
  const [userLevel, setUserLevel] = useState<string>("");
  const [themes, setThemes] = useState<ITheme[]>([]);

  const navigate = useNavigate();

  const ErroAudio: AudioPlayerProps = {
    src: "/Error_song.wav",
    setVolume: isVol,
    isError: isError,
  };

  useEffect(() => {
    const setVol: number = Number(localStorage.getItem("havevolume"));
    if (setVol) setIsVol(setVol + 0.2);
    const fetchThemes = async () => {
      try {
        const response = await ThemeService.getAllTheme();
        const Level: string = await UserServices.getUserLevel();

        setThemes(response.data);
        setUserLevel(Level);
      } catch (error) {
        console.error("Error by shown all the themes", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  useEffect(() => {
    if (userLevel) setLoading(false);
  }, [userLevel]);

  const handleBack = () => {
    navigate("/home");
  };

  const handleTheme = (Theme: string, NumberOfQuestion?: number) => {
    navigate("/generating", {
      state: {
        Theme: Theme,
        NumberOfQuestion: NumberOfQuestion,
        Userlevel: userLevel,
      },
    });
  };
  const handleRrefresh = () => {
    window.location.reload();
  };

  return (
    <>
      {loading && (
        <div className="relative w-screen h-screen bg-home_bg bg-cover bg-no-repeat">
          <Spin tip="Loading" size="large"></Spin>Loading...
        </div>
      )}
      {!loading && !isError && (
        <div className="w-screen h-screen bg-gradient-to-t from-bleu_ciel to-black">
          <Navbar />
          <div className="flex flex-col gap-5">
            <div
              className="flex items-center justify-center ml-3 rounded-xl bg-jaune_bar text-corail w-10 h-10 cursor-pointer"
              onClick={handleBack}
            >
              <h2>
                <LeftOutlined />
              </h2>
            </div>
            <div className="flex flex-col items-center justify-center text-white">
              <h3>WAEHLEN SIE EIN THEMA AUS</h3>
              <div className="grid grid-cols-2 gap-10">
                {themes.map((theme: ITheme) => (
                  <div
                    className="col-span-1"
                    onClick={() => {
                      handleTheme(theme.Theme, 15);
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-center bg-black w-18 h-12 px-8 rounded-lg cursor-pointer">
                      {theme.Theme}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {isError && (
        <div className="h-screen flex items-center justify-center">
          <AudioPlayer src={ErroAudio.src} setVolume={ErroAudio.setVolume} isError={true} />
          <Modal open={isError} title="Title" onOk={handleRrefresh}>
            <p>Ein Fehler ist aufgetreten, Sie müssen bitte diese Seite neu laden</p>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ManualTheme;
