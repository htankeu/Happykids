import { Button, Form, FormProps, Input } from "antd";
import { FieldType } from "../../types/fieldType";
import { CheckCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import AuthenticationService from "../../services/Authentication.service";
import { UserLogin } from "../../interfaces/userLgin.interface";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const [trueUser, setCheckUser] = useState(false);
  const [truePass, setCheckPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
    try {
      const user: UserLogin = {
        userAccount: values.Username,
        password: values.Password,
      };
      AuthenticationService.login(user).then((response) => {
        if (response.tokenId) navigate("/home");
      });
    } catch (error) {
      console.error("Anmeldung error", error);
    }
  };

  const handleSubmitError: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitError}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username "
          name="Username"
          rules={[{ required: true, message: "Geben Sie bitte Ihr username oder Ihre Mail-Adresse ein!" }]}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Input
            prefix={<UserOutlined />}
            suffix={<CheckCircleOutlined className={`text-xl ${trueUser ? "text-green-500" : "text-gray-500"}`} />}
            onChange={(input) => {
              const regexp = "^[a-zA-Z]+(.[w-]+)*@[w-]+(.[w-]+)+$ || ^(happy)([a-zA-Z0-9_-]){3,16}$";
              const userReg: RegExp = new RegExp(regexp);
              userReg.test(input.target.value) ? setCheckUser(true) : setCheckUser(false);
            }}
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="Passwort"
          name="Password"
          rules={[{ required: true, message: "Please input your username or your Email!" }]}
        >
          <Input.Password
            suffix={<CheckCircleOutlined className={`text-xl ${truePass ? "text-green-500" : "text-gray-500"}`} />}
            onChange={(input) => {
              const regexp = "^([a-zA-Z0-9@#$%^&*_=+?]){8,}$";
              const passReg: RegExp = new RegExp(regexp);
              passReg.test(input.target.value) ? setCheckPass(true) : setCheckPass(false);
            }}
          />
        </Form.Item>
        <p className="flex justify-center text-xs hover:text-blue-ciel hover:underline cursor-pointer">
          Passwort vergessen?
        </p>
        <Form.Item wrapperCol={{ offset: 10, span: 12 }}>
          <Button type="primary" htmlType="submit" className="px-12">
            GO
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
