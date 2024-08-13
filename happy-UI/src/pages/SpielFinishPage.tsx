import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SpielServices from "../services/Spiel.services";
import UserServices from "../services/User.services";
import { Button, Modal, Spin } from "antd";
import AudioPlayer from "../components/audio_player";
import { AudioPlayerProps } from "../interfaces/audioplayer.interface";
import Navbar from "../components/startpage_component/navbar_start";
import mqtt from "mqtt";
import { mqtt_host, mqtt_port } from "../Mqtt_host";

export const SpielFinishPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isVol, setIsVol] = useState<number>(0.3);
  const location = useLocation();
  const SpielResult = location.state.winner;
  const userScore = Number(location.state.UserScore);

  const navigate = useNavigate();

  const audio: AudioPlayerProps = {
    src: "/Succes_song.wav",
    setVolume: isVol,
  };
  const ErroAudio: AudioPlayerProps = {
    src: "/Error_song.wav",
    setVolume: isVol,
    isError: err,
  };

  useEffect(() => {
    const setVol: number = Number(localStorage.getItem("havevolume"));
    if (setVol) setIsVol(setVol + 0.2);
    SpielServices.generateWinMessage(SpielResult)
      .then((resultMess: string) => {
        setMessage(resultMess);
        setLoading(false);
      })
      .catch((error: unknown) => {
        setErr(true);
        console.error("Error beim Generieren der  Gewinn-Ausgabe", error);
      });

    UserServices.addUserPoints(userScore * 30)
      .then(() => {})
      .catch((error: unknown) => {
        setErr(true);
        console.error("Error beim Zufügen der Nutzer-Punkten", error);
      });

    const client = mqtt.connect(`mqtt://${mqtt_host}:${mqtt_port}`);
    client.on("connect", () => {
      console.log("new connection to broker from finish page");
      const topic = "home/sound_signal";
      if (SpielResult == "gewonnen") {
        client.publish(topic, "play_sound");
      }
      return () => {
        client.end();
      };
    });
  }, []);

  const handleRrefresh = () => {
    window.location.reload();
  };
  const handleBack = () => {
    localStorage.removeItem("Happyindex");
    navigate("/home");
  };

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
      {loading && (
        <div ref={fullScreen} className="relative w-screen h-screen bg-home_bg bg-cover bg-no-repeat">
          <Spin tip="Loading" size="large"></Spin>Loading...
        </div>
      )}
      {!loading && !err && (
        <div ref={fullScreen} className="bg-gradient-to-t from-bleu_ciel to-black text-white">
          <Navbar />
          <div className="w-screen h-screen flex flex-col items-center justify-center ">
            <AudioPlayer src={audio.src} setVolume={isVol} />
            <h1 className="text-7xl">{SpielResult == "gewonnen" ? "🎊" : "😔"}</h1>
            <div>
              <h3>{message}</h3>
            </div>
            <Button onClick={handleBack}>Go Home</Button>
          </div>
        </div>
      )}
      {err && (
        <div className="h-screen flex items-center justify-center">
          <AudioPlayer src={ErroAudio.src} setVolume={isVol} isError={true} />
          <Modal open={err} title="Title" onOk={handleRrefresh} onCancel={handleBack}>
            <p>
              Ein Fehler ist aufgetreten, Sie müssen bitte diese Seite neu laden. Oder cLICKEN "Cancel", um zum Start zu
              gehen
            </p>
          </Modal>
        </div>
      )}
    </>
  );
};
