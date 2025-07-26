import { Routes, Route } from "react-router-dom";
import "./styles/components.css";
import DynamicBackground from "./components/DynamicBackground";

//PAGE IMPORTS
import Login from "./pages/login.jsx";
import Homepage from "./pages/Home.jsx";
import CalenderPage from "./pages/Calender_Page.jsx";
import Entries from "./pages/Entries.jsx";
import JournalPage from "./pages/Journal_Page.jsx";
import TaskPage from "./pages/Task_Page.jsx";
import UserPage from "./pages/User_Page.jsx";
import WeeklyRecap from "./pages/Recap.jsx";

export default function App() {
  return (
    <DynamicBackground>
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recap" element={<WeeklyRecap />} />
        <Route path="/calender" element={<CalenderPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/entries" element={<Entries />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/userpage" element={<UserPage />} />
      </Routes>
    </DynamicBackground>
  );
}
