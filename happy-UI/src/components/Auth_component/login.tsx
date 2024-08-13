import { Button } from "antd";
import { LoginForm } from "./login_form";
import { LoginInterface } from "../../interfaces/auth.interface";

export const LogIn: React.FC<LoginInterface> = ({ toogleView }) => {
  return (
    <>
      <div className="h-3/4 flex flex-row items-center justify-center">
        <div className="grid grid-cols-2 w-1/2 h-full px-10 border-solid border-2 border-brun-terre rounded-3xl shadow-2xl">
          <div className="col-span-1 flex flex-col items-center justify-center gap-8 h-full bg-desc_bg bg-no-repeat bg-cover">
            <h4>
              <span className="text-violet">Bereit für</span> <span className="text-corail">Funny </span>
              <span className="text-brun-terre">Erfahrungen !!</span>
            </h4>
            <p className="px-2">Haben Sie eine spannende Erfahrung und lernen immer mehr Neues!</p>
            <Button className="flex text-white bg-blue-ciel py-5 px-8 items-center" onClick={toogleView}>
              ENROLL ME NOW
            </Button>
          </div>
          <div className="col-span-1 flex flex-col items-center justify-center">
            <h3 className="text-turquoise">EINLOGGEN</h3>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};
