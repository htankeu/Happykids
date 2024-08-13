import { Button, Form, FormProps, Input, message } from "antd";
import { FieldType } from "../../types/fieldType";
import { CheckCircleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import AuthenticationService from "../../services/Authentication.service";
import { UserRegister } from "../../interfaces/userRegister.interface";
import { RegisterInterface } from "../../interfaces/auth.interface";

export const RegisterForm: React.FC<RegisterInterface> = ({ toogleView }) => {
  const [trueUser, setCheckUser] = useState(false);

  const handleSubmit: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
    if (values.Password !== values.repeatpassword) {
      message.error("Die Passwoerter stimmen nicht ueberein");
      return;
    }
    try {
      const user: UserRegister = {
        Username: values.Username,
        Email: values.Email || "",
        Password: values.Password,
        Firstname: "",
        Lastname: "",
        Birthday: new Date(),
      };
      AuthenticationService.register(user).then(() => {
        values = {
          Username: "",
          Password: "",
          repeatpassword: "",
        };
        toogleView();
      });
    } catch (error) {
      message.error("Registrierung gescheitert");
      console.error("Error Registern", error);
    }
  };

  const handleSubmitError: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="layout-multiple-horizontal"
        layout="vertical"
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 900 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitError}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="Username"
          rules={[{ required: true, message: "Geben Sie bitte Ihr username oder Ihre Mail-Adresse ein!" }]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item<FieldType>
          label="E-Mail"
          name="Email"
          rules={[{ required: true, message: "Geben Sie bitte Ihre Mail-Adresse ein!" }]}
        >
          <Input
            suffix={<CheckCircleOutlined className={`text-xl ${trueUser ? "text-green-500" : "text-gray-500"}`} />}
            onChange={(input) => {
              const regexp = "^[a-zA-Z]+([a-zA-Z0-9]+)*@[a-z]+(.[a-z]+)+$";
              const userReg: RegExp = new RegExp(regexp);
              userReg.test(input.target.value) ? setCheckUser(true) : setCheckUser(false);
            }}
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="Passwort"
          name="Password"
          rules={[{ required: true, message: "Geben Sie bitte Ihr Passwort ein" }]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Passwort wieder"
          name="repeatpassword"
          rules={[{ required: true, message: "Geben Sie bitte Ihr Passwort ein" }]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 6 }}>
          <Button type="primary" htmlType="submit" className="px-6">
            REGISTERN
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
