import { useCallback, useEffect, useRef, useState } from "react";
import { IQuestion } from "../interfaces/Questions.interface";
import QuestionsServices from "../services/Questions.services";
import Navbar from "../components/startpage_component/navbar_start";
import { CaretRightOutlined, LeftOutlined, RedditOutlined, TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Modal, NotificationArgsProps, Progress, ProgressProps, Spin, notification } from "antd";
import { IProposition } from "../interfaces/Proposition.interface";
import compareHelper from "../helper-function/compare.helper";
import SpielServices from "../services/Spiel.services";
import UserServices from "../services/User.services";
import AudioPlayer from "../components/audio_player";
import { AudioPlayerProps } from "../interfaces/audioplayer.interface";

type NotificationPlacement = NotificationArgsProps["placement"];

export const QuestionsPage = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(0);
  const [aiScore, setAIScore] = useState<number>(0);
  const [successiveWin, setSuccessivWin] = useState<number>(1);
  const [selectedBorder, setSelectedBorder] = useState<string>("");
  const [isVol, setIsVol] = useState<number>(0.3);

  const [api, contextHolder] = notification.useNotification();

  const location = useLocation();

  const Theme = location.state.Theme;
  const Userlevel = location.state.Userlevel;

  const audio: AudioPlayerProps = {
    src: `${index - userScore > 5 ? "/peu_points_song.mp3" : "/Succes_song.wav"}`,
    setVolume: isVol,
  };
  const ErroAudio: AudioPlayerProps = {
    src: "/Error_song.wav",
    setVolume: isVol,
    isError: isError,
  };

  const openNotification = (placement: NotificationPlacement, message: string) => {
    api.info({
      message: <h3 className="text-gold">{`Prime ${successiveWin} nacheinandere Gewinne`}</h3>,
      description: message,
      icon: <TrophyOutlined style={{ color: "#FFD700" }} />,
      placement,
    });
  };

  const QuestionColor: string[] = ["green-vif", "indigo", "turquoise"];
  const QuestionLetter: string[] = ["A", "B", "C"];

  const barColor: ProgressProps["strokeColor"] = {
    "0%": "#FF7F50",
    "100%": "#FF7F50",
  };
  useEffect(() => {
    const setVol: number = Number(localStorage.getItem("havevolume"));
    if (setVol) setIsVol(setVol + 0.2);
    const fetchQuestions = async () => {
      try {
        const response = await QuestionsServices.getAllQuestions(Userlevel, Theme);
        setQuestions(response.data);
        const getIndex = localStorage.getItem("Happyindex");
        if (getIndex) setIndex(Number(getIndex));
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0 && index < questions.length) {
      setLoading(false);
    }
  }, [questions, index]);

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

  const actuellQuestion: IQuestion = questions[index] || { Question: "", Propositions: [], Response: "" };

  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleBack = () => {
    localStorage.removeItem("Happyindex");
    navigate("/home");
  };
  const handleNext = () => {
    setTimeout(() => {
      localStorage.setItem("Happyindex", (index + 1).toString());
      const theRealIndex = Number(localStorage.getItem("Happyindex"));
      setIndex(theRealIndex);
    }, 100);
  };
  const handleRrefresh = () => {
    window.location.reload();
  };

  const upgradeUserPoint = () => {
    UserServices.addUserPoints(1 * 10)
      .then(() => {
        setUserScore(userScore + 1);
        localStorage.removeItem("userScore");
        localStorage.setItem("userScore", userScore.toString());
      })
      .catch((error: unknown) => {
        console.error("Wir können keine Punkte zu diesem Nutzer hinzufügen", error);
      });
  };
  const handleSuccessiveWin = () => {
    setSuccessivWin(successiveWin + 1);
    if (successiveWin % 6 == 0) {
      try {
        SpielServices.generateEncouragement(successiveWin).then((result: string) => {
          const notifs = localStorage.getItem("HappyNotifs");
          localStorage.removeItem("HappyNotifs");
          localStorage.setItem("HappyNotifs", `${notifs}_${result}`);
          openNotification("topRight", result);
        });
      } catch (error) {
        console.error("Error with the service", error);
        setError(true);
      }
    }
  };

  const SpielEnd = () => {
    navigate("/spiel/end", {
      state: {
        winner: userScore > aiScore ? "gewonnen" : "niederlagen",
        UserScore: userScore,
      },
    });
  };

  if (index == 15) {
    SpielEnd();
  }

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
      {!loading && !isError && (
        <div
          ref={fullScreen}
          className="w-screen h-screen bg-gradient-to-t from-bleu_ciel to-black relative overflow-y-hidden overflow-y-scroll"
        >
          <Navbar />
          {contextHolder}
          <AudioPlayer src={audio.src} setVolume={isVol} />
          <div className="flex flex-col gap-3">
            <div
              className="flex items-center justify-center ml-3 rounded-xl bg-jaune_bar text-corail w-10 h-10 cursor-pointer"
              onClick={showModal}
            >
              <h2>
                <LeftOutlined />
              </h2>
              <Modal title="Abbrechen?" open={isModalOpen} onOk={handleBack} onCancel={handleCancel}>
                <p>Wollen Sie wirklich abbrechen?</p>
                <p>Sie werden dann erneut anfangen</p>
              </Modal>
            </div>
          </div>
          <div className="flex flex-row justify-between text-white mx-10 my-5">
            <div>
              <h4 className="text-corail">
                <UserOutlined /> SIE : {userScore}
              </h4>
            </div>
            <div>
              <h4 className="text-turquoise">
                <RedditOutlined /> AI : {aiScore}
              </h4>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Progress
              percent={((index + 1) / 15) * 100}
              showInfo={false}
              strokeWidth={20}
              style={{ width: "90%" }}
              strokeColor={barColor}
            />
          </div>
          <div className="flex flex-col items-center justify-center text-white transition ease-in-out delay-150">
            <h3>{actuellQuestion.Question || ""}</h3>
            <div className="grid grid-cols-2 gap-5 mt-2">
              {actuellQuestion.Propositions?.map((proposition: IProposition, indexierung) => (
                <div
                  className={`col-span-1 flex items-center text-xl justify-center cursor-pointer w-18 h-10 p-12 px-8 border-2 border-solid ${selectedBorder} bg-${QuestionColor[indexierung]}`}
                  onClick={() => {
                    if (compareHelper.compareString(proposition.Proposition, actuellQuestion.Response)) {
                      setSelectedBorder("border-green-vif");
                      upgradeUserPoint();
                      handleSuccessiveWin();
                    } else {
                      setSelectedBorder("border-red-500");
                      setSuccessivWin(0);
                    }
                    SpielServices.AISpiel(
                      actuellQuestion.Question,
                      actuellQuestion.Propositions!,
                      actuellQuestion.Response,
                      Userlevel
                    ).then((response) => {
                      if (response) setAIScore(aiScore + 1);
                      setTimeout(() => {
                        handleNext();
                        setSelectedBorder("");
                      }, 1000);
                    });
                  }}
                >
                  {QuestionLetter[indexierung]}. {proposition.Proposition}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <Button
              onClick={handleNext}
              className="flex flex-row items-center justify-center absolute bottom-5 right-0 mr-8 p-7"
            >
              <CaretRightOutlined /> Next
            </Button>
          </div>
        </div>
      )}
      {isError && (
        <div className="h-screen flex items-center justify-center">
          <AudioPlayer src={ErroAudio.src} setVolume={isVol} isError={true} />
          <Modal open={isError} title="Title" onOk={handleRrefresh} onCancel={handleBack}>
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
