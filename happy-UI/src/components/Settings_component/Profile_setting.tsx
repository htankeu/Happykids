import { CheckCircleOutlined, UserOutlined } from "@ant-design/icons";
import { DatePicker, Form, FormProps, Input, Modal, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { FieldType } from "../../types/fieldType";
import UserServices from "../../services/User.services";
import { IUser } from "../../interfaces/User.interface";
import AudioPlayer from "../audio_player";
import { AudioPlayerProps } from "../../interfaces/audioplayer.interface";

export const ProfileSetting: React.FC = () => {
  const [trueUser, setCheckUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [userInfos, setUserInfos] = useState<IUser>();
  const [isVol, setIsVol] = useState<number>(0.3);

  const ErroAudio: AudioPlayerProps = {
    src: "/Error_song.wav",
    setVolume: isVol,
    isError: isError,
  };

  const handleSubmit: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
    if (values.Password !== values.repeatpassword) {
      message.error("Die Passwoerter stimmen nicht ueberein");
      return;
    }
    try {
      // const user: UserRegister = {
      //   Username: values.Username,
      //   Email: values.Email || "",
      //   Password: values.Password,
      //   Firstname: "",
      //   Lastname: "",
      //   Birthday: new Date(),
      // };
      //   AuthenticationService.register(user);
    } catch (error) {
      message.error("Registrierung gescheitert");
      console.error("Error Registern", error);
    }
  };

  const handleSubmitError: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  const handleRrefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const setVol: number = Number(localStorage.getItem("havevolume"));
    if (setVol) setIsVol(setVol + 0.2);
    const fetchUserInfo = async () => {
      try {
        const response = await UserServices.getUserInfo();
        setUserInfos(response);
        setLoading(false);
      } catch (error) {
        console.error("Error by getting", error);
        setError(true);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      {loading && (
        <div className="w-full flex items-center justify-center">
          <Spin tip="loading" size="large"></Spin>
        </div>
      )}
      {!loading && !isError && (
        <div className="w-full h-1/4">
          <Form
            name="layout-multiple-horizontal"
            layout="vertical"
            labelCol={{ span: 16 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 900 }}
            initialValues={{ userInfos, remember: true }}
            onFinish={handleSubmit}
            onFinishFailed={handleSubmitError}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              initialValue={userInfos?.Username}
              name="Username"
              rules={[{ required: true, message: "Geben Sie bitte Ihr username oder Ihre Mail-Adresse ein!" }]}
            >
              <Input prefix={<UserOutlined />} value={userInfos?.Username} />
            </Form.Item>

            <div className="flex flex-row w-full">
              <Form.Item<FieldType>
                label="Vorname"
                initialValue={userInfos?.LastName}
                name="Lastname"
                rules={[{ required: true, message: "Geben Sie bitte Ihren Vorname ein!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="Nachname"
                initialValue={userInfos?.FirstName}
                name="Firstname"
                rules={[{ required: true, message: "Geben Sie bitte Ihren Nachname ein!" }]}
              >
                <Input />
              </Form.Item>
            </div>

            <Form.Item<FieldType>
              label="E-Mail"
              initialValue={userInfos?.Email}
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

            <Form.Item label="Geburtstag" name="Birthdate">
              <DatePicker />
            </Form.Item>
            {/* <Form.Item wrapperCol={{ offset: 6, span: 6 }}>
            <Button type="primary" htmlType="submit" className="px-6">
              REGISTERN
            </Button>
          </Form.Item> */}
            {isError && (
              <div className="h-screen flex items-center justify-center">
                <AudioPlayer src={ErroAudio.src} setVolume={isVol} isError={ErroAudio.isError} />
                <Modal open={isError} title="Title" onOk={handleRrefresh}>
                  <p>Ein Fehler ist aufgetreten, Sie müssen bitte diese Seite neu laden</p>
                </Modal>
              </div>
            )}
          </Form>
        </div>
      )}
    </>
  );
};
