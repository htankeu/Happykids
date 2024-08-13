import { SettingOutlined, NotificationOutlined, LogoutOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface page {
  notif?: boolean;
}

const Navbar: React.FC<page> = ({ notif }) => {
  const [Notifs, setNotifs] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSettingClick = () => {
    navigate("/settings");
  };
  const handleGoHome = () => {
    navigate("/home");
  };
  const handleNotificationClick = () => {
    navigate("/Notifications");
  };

  useEffect(() => {
    const allNotifs = localStorage.getItem("HappyNotifs");
    if (allNotifs) setNotifs(allNotifs?.split("_"));
  }, []);

  const handleLogOut = () => {
    navigate("/");
    localStorage.removeItem("Happytoken");
    localStorage.removeItem("HappyuserId");
    localStorage.removeItem("havevolume");
    localStorage.removeItem("HappyNotifs");
  };
  return (
    <>
      <div className="grid grid-cols-2 ml-4">
        <div className="col-span-1 flex flex-row items-center">
          <h2 className="flex flex-row items-center cursor-pointer font-Tytoon" onClick={handleGoHome}>
            <span className={`${notif ? "text-white" : "text-violet"}`}>Happy</span>
            <span className="text-corail">Kids</span>
          </h2>
        </div>
        <div className="col-span-1 flex flex-row justify-end items-center gap-4 mr-10 mt-5">
          {/* <MenuOutlined style={{ fontSize: 20 }} /> */}
          <div
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-2xl shadow-black cursor-pointer bg-btn_bg bg-cover bg-no-repeat"
            onClick={handleSettingClick}
          >
            <SettingOutlined style={{ fontSize: 25, color: "#FFF" }} />
          </div>
          <div
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-2xl shadow-black bg-btn_bg bg-cover cursor-pointer bg-no-repeat"
            onClick={handleNotificationClick}
          >
            <Badge count={Notifs.length}>
              <NotificationOutlined style={{ fontSize: 25, color: "#FFF" }} />
            </Badge>
          </div>
          <div
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-2xl shadow-black bg-btn_bg bg-cover cursor-pointer bg-no-repeat"
            onClick={handleLogOut}
          >
            <LogoutOutlined style={{ fontSize: 25, color: "#FFF" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
