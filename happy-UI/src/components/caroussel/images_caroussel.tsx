import { Carousel } from "antd";
import HappyImg from "/assets/images/HappyKids-bg.png";
import abcdBlocks from "../../assets/animation-lottie/abcdBlock.json";
import Bricks from "../../assets/animation-lottie/brickToys.json";
import { useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

export const ImagesCaroussel: React.FC = () => {
  const containerBlock = useRef<LottieRefCurrentProps>(null);
  const containerBricks = useRef<LottieRefCurrentProps>(null);

  return (
    <>
      <div className="h-1/2 w-3/4">
        <Carousel autoplay autoplaySpeed={3000} className="flex items-center justify-center">
          <div>
            <img src={HappyImg} title="HapyLogo" className="object-contain w-full" />
          </div>
          <div>
            <Lottie lottieRef={containerBlock} animationData={abcdBlocks} />
          </div>
          <div>
            <Lottie lottieRef={containerBricks} animationData={Bricks} />
          </div>
        </Carousel>
      </div>
    </>
  );
};
