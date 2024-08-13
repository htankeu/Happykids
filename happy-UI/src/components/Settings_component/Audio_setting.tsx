import { Switch } from "antd";
import React from "react";
import { VolumeControl } from "./Volume_control";

export const AudioSetting: React.FC = () => {
  return (
    <>
      <div className="flex items-start gap-6">
        Sound <Switch defaultChecked onChange={() => {}} />
      </div>
      <VolumeControl onVolumeChange={() => {}} label="LautStark" />
      <VolumeControl onVolumeChange={() => {}} label="Sound Effekts Lautstark" />
    </>
  );
};
