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
  const [isEnvelopeFlashing, setIsEnvelopeFlashing] = useState(false);
  const [isReceiptFlashing, setIsReceiptFlashing] = useState(false);
  const [isMoneyFlashing, setIsMoneyFlashing] = useState(false);
  const [isReceiptClicked, setIsReceiptClicked] = useState(false);
  const [receiptType, setReceiptType] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);
  const [uid, setUid] = useState("");
  const [cardBalance, setCardBalance] = useState(0);
  useEffect(() => {}, [uid]);
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
          isEnvelopeFlashing,
          setIsEnvelopeFlashing,
          isReceiptFlashing,
          setIsReceiptFlashing,
          isMoneyFlashing,
          setIsMoneyFlashing,
          isReceiptClicked,
          setIsReceiptClicked,
          depositAmount,
          setDepositAmount,
          receiptType,
          setReceiptType,
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
