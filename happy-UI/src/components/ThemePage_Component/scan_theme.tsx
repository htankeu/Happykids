import React, { useEffect, useState } from "react";
import Navbar from "../startpage_component/navbar_start";
import { LeftOutlined } from "@ant-design/icons";
import AudioPlayer from "../audio_player";
import { Modal, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { AudioPlayerProps } from "../../interfaces/audioplayer.interface";
import mqtt from "mqtt";
import UserServices from "../../services/User.services";
import { OTHEME } from "../../enum/theme-enum";
import { mqtt_host, mqtt_port } from "../../Mqtt_host";

const ScanTheme: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [isVol, setIsVol] = useState<number>(0.3);
  const [userLevel, setUserLevel] = useState<string>("");
  const [mqttMessage, setMqttMessage] = useState<string>(""); // State to store MQTT messages

  const navigate = useNavigate();

  const ErroAudio: AudioPlayerProps = {
    src: "/Error_song.wav",
    setVolume: isVol,
    isError: isError,
  };

  const handleTheme = (Theme: string | OTHEME, NumberOfQuestion?: number) => {
    navigate("/generating", {
      state: {
        Theme: Theme,
        NumberOfQuestion: NumberOfQuestion,
        Userlevel: userLevel,
      },
    });
  };

  useEffect(() => {
    const setVol: number = Number(localStorage.getItem("havevolume"));
    if (setVol) setIsVol(setVol + 0.2);
    const fetchUser = async () => {
      try {
        const Level: string = await UserServices.getUserLevel();

        setUserLevel(Level);
      } catch (error) {
        console.error("Error by shown all the themes", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userLevel) setLoading(false);

    const client = mqtt.connect(`mqtt://${mqtt_host}:${mqtt_port}`);

    client.on("connect", () => {
      console.log(" Connected to MQTT Broker");

      const topic = "home/color_detected";
      client.subscribe(topic, (err) => {
        if (!err) {
          console.log("Subscribed to topic");
        }
      });
    });

    client.on("message", (topic, message) => {
      // Handle incoming messages
      const msg = message.toString() as "BLUE" | "GREEN" | "RED" | "YELLOW";
      if (["BLUE", "GREEN", "RED", "YELLOW"].includes(msg)) {
        const theme: OTHEME = OTHEME[msg];
        console.log(`Received message: ${msg} from topic: ${topic}`);
        setMqttMessage(msg); // Update the state with the incoming message
        handleTheme(theme || mqttMessage, 15);
      }
    });

    //cleanup amount
    return () => {
      client.end();
    };
  }, [userLevel]);

  const handleBack = () => {
    navigate("/home");
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
              <h3>SCANNEN SIE BITTE EINE FARBE, UM EIN THEMA AUSZUWÄHLEN</h3>
              <h5>Drücken sie zunächst auf den schwarzen Button von der Konsole</h5>
              <div className="grid grid-cols-2 gap-10 mt-10">
                <div className="col-span-1">
                  <div className="flex flex-wrap items-center justify-center bg-blue-500 w-18 h-12 px-8 rounded-lg cursor-pointer">
                    Naturwissenschaft
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-wrap items-center justify-center bg-red-500 w-18 h-12 px-8 rounded-lg cursor-pointer">
                    Mathematik
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-wrap items-center justify-center bg-green-500 w-18 h-12 px-8 rounded-lg cursor-pointer">
                    Informatik
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-wrap items-center justify-center bg-yellow-500 w-18 h-12 px-8 rounded-lg cursor-pointer">
                    Chemie
                  </div>
                </div>
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
      <div></div>
    </>
  );
};

export default ScanTheme;
