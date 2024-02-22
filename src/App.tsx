import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import InsideTheBank from "./components/InsideTheBank";
import CreateAccount from "./components/CreateAccount";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/inside" element={<InsideTheBank />} />
      <Route path="/inside/create" element={<CreateAccount />} />
    </Routes>
  );
}

export default App;
