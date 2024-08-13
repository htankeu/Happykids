import { useEffect, useRef } from "react";
import { AudioPlayerProps } from "../interfaces/audioplayer.interface";

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, setVolume, isError = false }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Play the audio when the component mounts
    const play = async () => {
      if (audioRef.current) {
        audioRef.current.volume = setVolume;
        await audioRef.current.play();
      }
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };
    };
    play();
  }, []);

  return (
    <>
      <div>{isError ? <audio ref={audioRef} src={src} /> : <audio ref={audioRef} src={src} loop />}</div>
    </>
  );
};

export default AudioPlayer;
