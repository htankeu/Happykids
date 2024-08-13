import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { PlayCircleOutlined } from "@ant-design/icons";

const HomeHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/auth");
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="flex gap-0">
          <Button
            type="primary"
            className="flex items-center justify-center p-5 text-lg rounded-t-3xl rounded-b-2xl hover:bg-corail mr-10"
            onClick={handleNavigate}
          >
            Go <PlayCircleOutlined />
          </Button>
        </div>
      </div>
    </>
  );
};

export default HomeHeader;
