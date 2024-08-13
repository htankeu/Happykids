import { useCallback, useEffect, useRef, useState } from "react";
import ScanTheme from "../components/ThemePage_Component/scan_theme";
import ManualTheme from "../components/ThemePage_Component/manual_theme";
import { FloatButton } from "antd";
import { ScanOutlined, SelectOutlined } from "@ant-design/icons";

const ChooseThemePage = () => {
  const [scan, setScan] = useState<boolean>(true);
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
  return (
    <>
      <div ref={fullScreen}>
        {scan ? <ScanTheme /> : <ManualTheme />}
        <FloatButton.Group
          trigger="click"
          type="primary"
          style={{ right: 54 }}
          icon={scan ? <ScanOutlined /> : <SelectOutlined />}
        >
          <FloatButton
            description={<h4 className="text-md flex items-center justify-center">Manuelle Auswahl</h4>}
            style={{ width: "80px", height: "80px" }}
            onClick={() => {
              setScan(false);
            }}
          />
          <FloatButton
            description={<h4 className="text-md">Farbe scannen</h4>}
            style={{ width: "80px", height: "80px", fontSize: "80px" }}
            onClick={() => {
              setScan(true);
            }}
          />
        </FloatButton.Group>
      </div>
    </>
  );
};

export default ChooseThemePage;
