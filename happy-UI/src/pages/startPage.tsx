import Navbar from "../components/startpage_component/navbar_start";
import { PlayCircleOutlined, QuestionOutlined, UserOutlined } from "@ant-design/icons";
import { Progress, ProgressProps, Card, Avatar, Spin, Modal } from "antd";
import { AudioPlayerProps } from "../interfaces/audioplayer.interface";
import AudioPlayer from "../components/audio_player";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { IUser } from "../interfaces/User.interface";
import UserServices from "../services/User.services";
import LevelServices from "../services/Level.services";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Cloud from "../assets/animation-lottie/cloud.json";
import QuestionsServices from "../services/Questions.services";

export const StartPage = () => {
  const navigate = useNavigate();
  const [userInfos, setUserInfos] = useState<IUser | null>();
  const [nextLevel, setNextLevel] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [isVol, setIsVol] = useState<number>(0.3);
  const [click, setClick] = useState<boolean>(false);
  const [quizenable, setQuizenable] = useState<boolean>(false);
  const [userLevel, setUserLevel] = useState<string>("");

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

  const containerCloud = useRef<LottieRefCurrentProps>(null);
  const barColor: ProgressProps["strokeColor"] = {
    "0%": "#FF7F50",
    "100%": "#FF7F50",
  };

  const audio: AudioPlayerProps = {
    src: "/debut_song.mp3",
    setVolume: isVol,
  };

  const ErroAudio: AudioPlayerProps = {
    src: "/Error_song.wav",
    setVolume: isVol,
    isError: isError,
  };
  const Clickaudio: AudioPlayerProps = {
    src: "/Click_song.wav",
    setVolume: isVol,
  };

  const handleSpielen = () => {
    setClick(true);
    setTimeout(() => {
      setClick(false);
      navigate("/spielen");
    }, 300);
  };

  const handleQuizSpielen = () => {
    setClick(true);
    setTimeout(() => {
      setClick(false);
      navigate("/quiz", {
        state: {
          Userlevel: userLevel,
        },
      });
    }, 300);
  };
  const handleRrefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const setVol: number = Number(localStorage.getItem("havevolume"));
    if (setVol) setIsVol(setVol + 0.2);
    const fetchUserInfos = async () => {
      try {
        await UserServices.setUserNextLevel();
        let response: IUser = await UserServices.getUserInfo();
        const levelResponse: string = await LevelServices.getNextLevel();
        response = await UserServices.getUserInfo();
        const levelUser: string = response.Level!.Level;
        setUserLevel(levelUser);
        setUserInfos(response);
        setNextLevel(levelResponse);
        QuestionsServices.getAllQuestions()
          .then((allQuestion) => {
            const allQuestions = allQuestion.data;
            if (allQuestions.length >= 15) {
              setQuizenable(true);
            }
          })
          .catch((err: unknown) => {
            setError(true);
            console.error("Error established", err);
          });
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    fetchUserInfos();
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
      {!loading && !isError && (
        <div ref={fullScreen} className="relative w-screen h-screen bg-home_natur_bg bg-cover">
          <div className="w-screen flex flex-col">
            <AudioPlayer src={audio.src} setVolume={isVol} />
            {click ? <AudioPlayer src={Clickaudio.src} setVolume={1} /> : ""}

            <Navbar />
            <div className="flex flex-row">
              <div className="w-1/3 h-1">
                <Lottie
                  onComplete={() => {
                    containerCloud.current?.setDirection(-1);
                    containerCloud.current?.play();
                  }}
                  lottieRef={containerCloud}
                  loop={true}
                  animationData={Cloud}
                />
              </div>
              <div className="w-1/3 h-1">
                <Lottie
                  onComplete={() => {
                    containerCloud.current?.setDirection(-1);
                    containerCloud.current?.play();
                  }}
                  lottieRef={containerCloud}
                  loop={true}
                  animationData={Cloud}
                />
              </div>
              <div className="w-1/4 h-1">
                <Lottie
                  onComplete={() => {
                    containerCloud.current?.setDirection(-1);
                    containerCloud.current?.play();
                  }}
                  lottieRef={containerCloud}
                  loop={true}
                  animationData={Cloud}
                />
              </div>
            </div>
          </div>
          <div className="rounded-lg flex flex-row justify-end">
            <div className="absolute ml-3 bottom-0 left-0 col-span-1 w-1/4 flex flex-col justify-end items-center gap-2 mr-10 mt-10 rounded-xl bg-gradient-to-t from-bleu_ciel to-black p-4 shadow-2xl shadow-black">
              <h4>
                <span className="text-jaune_bar">
                  {(userInfos!.LevelId! + 1) * 1500 - userInfos!.Points!} happyCoins
                </span>
                <span className="text-corail"> to {nextLevel} - Level</span>
              </h4>
              <div className="w-full flex flex-row items-center">
                <h3 className="flex items-center justify-center rounded-lg bg-jaune_bar text-corail w-10 h-10">
                  {userInfos?.LevelId}
                </h3>
                <Progress
                  percent={(userInfos!.Points! / ((userInfos!.LevelId! + 1) * 1500)) * 100}
                  showInfo={false}
                  strokeWidth={30}
                  style={{ width: "80%" }}
                  strokeColor={barColor}
                />
              </div>
            </div>
            <div className="flex flex-col w-1/4 absolute bottom-0 right-0">
              <div className="w-full flex flex-row items-center cursor-pointer" onClick={handleSpielen}>
                <h3 className="flex items-center justify-center rounded-lg w-12 h-12 text-corail bg-jaune_bar">
                  <PlayCircleOutlined style={{ fontSize: 30 }} />
                </h3>
                <h3 className="flex items-center w-1/2 h-10 bg-corail text-jaune_bar rounded-r-lg">
                  <span className="ml-2">SPIELEN</span>
                </h3>
              </div>
              <div
                className="w-full flex flex-row items-center cursor-pointer"
                onClick={() => {
                  if (quizenable) handleQuizSpielen();
                }}
              >
                <h3
                  className={`flex items-center justify-center rounded-lg w-12 h-12 ${
                    quizenable ? "text-corail bg-jaune_bar" : "text-gray-400 bg-gray-200"
                  }`}
                >
                  <QuestionOutlined style={{ fontSize: 30 }} />
                </h3>
                <h3
                  className={`flex items-center w-1/2 h-10 bg-corail text-jaune_bar rounded-r-lg ${
                    quizenable ? "text-jaune_bar bg-corail" : "text-gray-400 bg-gray-200"
                  }`}
                >
                  <span className="ml-2">QUIZ</span>
                </h3>
              </div>
            </div>
            <div className="flex flex-col w-1/4 mt-5">
              <Card style={{ width: 230 }} className="bg-gradient-to-t from-bleu_ciel to-black shadow-2xl shadow-black">
                <div className="flex flex-row items-center gap-6">
                  <Avatar shape="square" size={70} icon={<UserOutlined />} className="bg-jaune_bar" />
                  <h3 className="text-corail">{userInfos?.Username}</h3>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
      {isError && <AudioPlayer src={ErroAudio.src} setVolume={isVol} isError={ErroAudio.isError} />}
      <Modal open={isError} title="Title" onOk={handleRrefresh}>
        <p>Ein Fehler ist aufgetreten, Sie müssen bitte diese Seite neu laden</p>
      </Modal>
    </>
  );
};
