import { RegisterInterface } from "../../interfaces/auth.interface";
import { RegisterForm } from "./register_form";
import { Button } from "antd";

export const Register: React.FC<RegisterInterface> = ({ toogleView }) => {
  return (
    <>
      <div className="h-5/6 flex flex-row items-center justify-center overflow-y-hidden overflow-y-scroll">
        <div className="grid grid-cols-2 w-1/2 h-full px-10 border-solid border-2 border-brun-terre rounded-3xl shadow-2xl">
          <div className="col-span-1 flex flex-col items-center justify-center overflow-y-hidden overflow-y-scroll">
            <h5 className="text-turquoise">Enroll you Now !</h5>
            <RegisterForm toogleView={toogleView} />
          </div>
          <div className="col-span-1 flex flex-col items-center justify-center gap-8 h-full bg-desc_bg bg-no-repeat bg-cover">
            <h4>
              <span className="text-violet">Hab</span> <span className="text-corail">Spaß </span>
              <span className="text-brun-terre">mit uns !!</span>
            </h4>
            <p className="px-2">Registrieren Sie und fangen unsere Demo zu spielen. Lassen Ihnen schmecken!</p>
            <Button className="flex text-white bg-blue-ciel py-5 px-8 items-center" onClick={toogleView}>
              EINLOGGEN
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
