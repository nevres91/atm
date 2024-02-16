import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import InsideTheBank from "./components/InsideTheBank";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/inside" element={<InsideTheBank />} />
    </Routes>
  );
}

export default App;
