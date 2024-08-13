import { useCallback, useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import peroquet from "../assets/animation-lottie/peroquet.json";
import Birds from "../assets/animation-lottie/manyBirds.json";
import Cloud from "../assets/animation-lottie/cloud.json";
import Sun from "../assets/animation-lottie/sun.json";
import Tree from "../assets/animation-lottie/tree.json";
import RobotBlutter from "../assets/animation-lottie/robotButterfly.json";
import Robot from "../assets/animation-lottie/robot.json";
import ButterFly from "../assets/animation-lottie/butterfly.json";
import Dirigible from "../assets/animation-lottie/dirigible.json";
import Mario from "../assets/animation-lottie/mario.json";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { PlayCircleOutlined } from "@ant-design/icons";

export const Home = () => {
  const containerPeroquet = useRef<LottieRefCurrentProps>(null);
  const containerBirds = useRef<LottieRefCurrentProps>(null);
  const containerCloud = useRef<LottieRefCurrentProps>(null);
  const containerCloud2 = useRef<LottieRefCurrentProps>(null);
  const containerSun = useRef<LottieRefCurrentProps>(null);
  const containerTree = useRef<LottieRefCurrentProps>(null);
  const containerButterFly = useRef<LottieRefCurrentProps>(null);

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

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/auth");
  };

  return (
    <>
      <div
        ref={fullScreen}
        className="w-screen h-full bg-ciel_bg bg-cover bg-no-repeat overflow-y-hidden overflow-y-scroll"
      >
        <div className="flex flex-col w-screen h-1/6 bg-ciel_bg bg-cover bg-no-repeat">
          <div className="flex flex-row justify-center">
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
            <div className="w-1/3 h-1">
              <Lottie
                onComplete={() => {
                  containerCloud2.current?.setDirection(-1);
                  containerCloud2.current?.play();
                }}
                lottieRef={containerCloud2}
                loop={true}
                animationData={Cloud}
              />
            </div>
            <div className="w-1/4 h-1">
              <Lottie
                onComplete={() => {
                  containerCloud2.current?.setDirection(-1);
                  containerCloud2.current?.play();
                }}
                lottieRef={containerCloud2}
                loop={true}
                animationData={Cloud}
              />
            </div>
          </div>
          <div className="w-1/12">
            <Lottie lottieRef={containerSun} animationData={Sun} />
          </div>
          <div className="flex flex-row w-screen h-1/12 justify-between">
            <div className="w-1/4">
              <Lottie
                onComplete={() => {
                  containerBirds.current?.setDirection(-1);
                  containerBirds.current?.play();
                }}
                lottieRef={containerBirds}
                loop={true}
                animationData={Birds}
              />
            </div>
            <div className="max-w-20">
              <Lottie animationData={Dirigible} />
            </div>
            <div className="w-1/12">
              <Lottie
                onComplete={() => {
                  containerPeroquet.current?.setDirection(-1);
                  containerPeroquet.current?.play();
                }}
                lottieRef={containerPeroquet}
                loop={true}
                animationData={peroquet}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row w-screen justify-between">
          <div className="flex flex-row mt-15 w-1/2 gap-2">
            <div className="w-1/2">
              <Lottie lottieRef={containerTree} animationData={Tree} />
            </div>
            <div className="w-1/2">
              <Lottie animationData={RobotBlutter} />
            </div>
            <div className="max-w-10">
              <Lottie lottieRef={containerButterFly} animationData={ButterFly} loop={true} />
            </div>
          </div>
          <div className="w-1/6 flex">
            <Lottie animationData={Robot} />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center bg-black rounded-t-3xl w-20 rounded-b-2xl">
            <Button
              type="primary"
              className="flex items-center justify-center p-5 text-lg rounded-t-3xl rounded-b-2xl hover:bg-corail mr-10"
              onClick={handleNavigate}
              style={{ width: "195px" }}
            >
              Go <PlayCircleOutlined />
            </Button>
          </div>
        </div>
        <div className="flex flex-row w-screen justify-center">
          <div className="flex flex-row w-screen justify-center">
            <div className="flex flex-col gap-y-2 justify-center">
              <h1 className="flex justify-center">
                <span className="text-indigo">Happy</span>
                <span className="text-corail">Kids</span>
              </h1>
              <div className="flex flex-row justify-center overflow-y-hidden overflow-y-scroll">
                <p className="w-1/2">
                  HappyKids ist ein Spiel, das Kinder beim Lernen neue Dinge im Bereich Mathematik, usw. mit Hilfe der
                  KI hilft.
                </p>
                <div className="max-w-20">
                  <Lottie animationData={Mario} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
