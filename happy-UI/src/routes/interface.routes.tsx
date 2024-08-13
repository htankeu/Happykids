import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../pages/mainPage";
import { AuthPage } from "../pages/authPage";
import { StartPage } from "../pages/startPage";
import ChooseThemePage from "../pages/chooseThemePage";
import { LoadingPage } from "../pages/LoadingPage";
import { QuestionsPage } from "../pages/QuestionsPage";
import { SettingsPage } from "../pages/SettingsPage";
import { NotificationPage } from "../pages/NotificationsPage";
import { SpielFinishPage } from "../pages/SpielFinishPage";
import { QuizPage } from "../pages/QuizPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/home",
    element: <StartPage />,
    children: [],
  },
  {
    path: "/spielen",
    element: <ChooseThemePage />,
    children: [],
  },
  {
    path: "/generating",
    element: <LoadingPage />,
  },
  {
    path: "/questions",
    element: <QuestionsPage />,
  },
  {
    path: "/quiz",
    element: <QuizPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/Notifications",
    element: <NotificationPage />,
  },
  {
    path: "/spiel/end",
    element: <SpielFinishPage />,
  },
]);

export default router;
