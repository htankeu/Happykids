import React, { useState } from "react";
import { VolumeControlProps } from "../../interfaces/Volume_control.interface";
import { Slider } from "antd";

export const VolumeControl: React.FC<VolumeControlProps> = ({ onVolumeChange, label }) => {
  const [volume, setVolume] = useState<number>(50);

  const handleChangeVolume = (value: number) => {
    setVolume(value);
    if (onVolumeChange) onVolumeChange(value);
  };

  return (
    <>
      <div className="w-3/4 mx-auto mt-4">
        <label htmlFor="Lautstärke" className="text-lg mb-2">
          {label} : {volume}
        </label>
        <Slider id="volume-slider" min={0} max={100} value={volume} onChange={handleChangeVolume} />
      </div>
    </>
  );
};
