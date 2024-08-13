import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "../components/startpage_component/navbar_start";
import { LeftOutlined, NotificationOutlined } from "@ant-design/icons";
import { Badge } from "antd";

export const NotificationPage = () => {
  const [Notifs, setNotifs] = useState<string[]>([]);
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

  useEffect(() => {
    const allNotifs = localStorage.getItem("HappyNotifs");
    if (allNotifs) setNotifs(allNotifs?.split("_"));
  }, []);
  return (
    <>
      <div ref={fullScreen} className="w-screen h-screen bg-violet flex flex-col">
        <Navbar notif={true} />
        <div className="flex flex-col gap-8">
          <div
            className="flex items-center justify-center ml-3 rounded-xl bg-jaune_bar text-corail w-10 h-10 cursor-pointer"
            onClick={() => {}}
          >
            <h2>
              <LeftOutlined />
            </h2>
          </div>
          <div className="flex flex-row gap-2 justify-center items-center">
            <div className=" rounded-full w-12 h-12 bg-gray-400 flex items-center justify-center">
              <Badge count={"."}>
                <NotificationOutlined style={{ fontSize: 30, color: "#FFF" }} />
              </Badge>{" "}
            </div>
            <h2>Benachrihtigungen</h2>
          </div>
          <div className="flex flex-col gap-3 justify-center h-1/2 items-center overflow-hidden overflow-y-scroll">
            {Notifs.map((notif: string, index: number) => (
              <div className="flex flex-col gap-1 bg-white w-1/2 rounded-xl">
                <h4>#{index + 1}</h4>
                <p>{notif}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
