import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionsServices from "../services/Questions.services";
import Mario from "../assets/animation-lottie/mario.json";
import { Modal, Spin } from "antd";
import Lottie from "lottie-react";
import { AudioPlayerProps } from "../interfaces/audioplayer.interface";
import AudioPlayer from "../components/audio_player";

export const LoadingPage = () => {
  const [isVol, setIsVol] = useState<number>(0.3);
  const [isError, setError] = useState<boolean>(false);
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

  const ErroAudio: AudioPlayerProps = {
    src: "/Error_song.wav",
    setVolume: isVol,
    isError: isError,
  };

  const naviagte = useNavigate();
  const location = useLocation();

  const audio: AudioPlayerProps = {
    src: "/debut_song.mp3",
    setVolume: isVol,
  };

  const handleBack = () => {
    naviagte("/home");
  };

  useEffect(() => {
    const setVol: number = Number(localStorage.getItem("havevolume"));
    if (setVol) setIsVol(setVol + 0.2);
    const Theme = location.state.Theme;
    const Userlevel = location.state.Userlevel;
    const NumberOfQuestion = location.state.NumberOfQuestion;

    QuestionsServices.generateQuestions(Theme, Userlevel, NumberOfQuestion)
      .then(() => {
        localStorage.removeItem("Happyindex");
        localStorage.removeItem("HappyuserScore");
        localStorage.removeItem("HappyaiScore");
        naviagte("/questions", {
          state: {
            Theme: Theme,
            NumberOfQuestion: NumberOfQuestion,
            Userlevel: Userlevel,
          },
        });
      })
      .catch((err) => {
        console.error("Error by generating", err);
        setError(true);
      });
  }, []);
  return (
    <>
      <div
        ref={fullScreen}
        className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-t from-bleu_ciel to-black text-white"
      >
        <AudioPlayer src={audio.src} setVolume={isVol} />
        <div className="max-w-60">
          <Lottie animationData={Mario} />
        </div>
        <div className="flex gap-1">
          <Spin tip="Loading" size="small"></Spin>Loading...
        </div>
      </div>
      {isError && (
        <div className="h-screen flex items-center justify-center">
          <AudioPlayer src={ErroAudio.src} setVolume={ErroAudio.setVolume} isError={true} />
          <Modal open={isError} title="Title" onOk={handleBack}>
            <p>GenerierenFehler oder Connection Error , zu Startseite zurückgehen.</p>
          </Modal>
        </div>
      )}
    </>
  );
};
