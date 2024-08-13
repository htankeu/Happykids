import { RouterProvider } from "react-router-dom";
import router from "./routes/interface.routes";
import { ConfigProvider } from "antd";

const App = () => {
  return (
    <>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </>
  );
};

export default App;
