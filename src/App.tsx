import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import InsideTheBank from "./components/InsideTheBank";
import CreateAccount from "./components/CreateAccount";
import CardRecovery from "./components/CardRecovery";
import { UserContext } from "./context/UserContext";
import { useEffect, useState } from "react";
import { CardContext } from "./context/CardContext";
import TransferMoney from "./components/TransferMoney";
import DepositMoney from "./components/DepositMoney";
import WithdrawMoney from "./components/WithdrawMoney";
import ChangePin from "./components/ChangePin";

function App() {
  const [isCardValid, setIsCardValid] = useState(false);
  const [currentCard, setCurrentCard] = useState<string>("");
  const [isConfiscated, setIsConfiscated] = useState(false);
  const [uid, setUid] = useState("");
  const [cardBalance, setCardBalance] = useState(0);
  useEffect(() => {
    console.log("APP:", uid);
  }, [uid]);
  return (
    <UserContext.Provider value={{ uid, setUid }}>
      <CardContext.Provider
        value={{
          isCardValid,
          setIsCardValid,
          currentCard,
          setCurrentCard,
          isConfiscated,
          setIsConfiscated,
          cardBalance,
          setCardBalance,
        }}
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/inside" element={<InsideTheBank />} />
          <Route path="/inside/create" element={<CreateAccount />} />
          <Route path="/inside/card_recovery" element={<CardRecovery />} />
          <Route path="/inside/transfer" element={<TransferMoney />} />
          <Route path="/inside/deposit" element={<DepositMoney />} />
          <Route path="/inside/withdraw" element={<WithdrawMoney />} />
          <Route path="/inside/change_pin" element={<ChangePin />} />
        </Routes>
      </CardContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
