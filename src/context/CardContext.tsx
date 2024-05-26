import { createContext, useContext } from "react";

interface CardContextProps {
  isCardValid: boolean;
  setIsCardValid: React.Dispatch<React.SetStateAction<boolean>>;
  isEnvelopeFlashing: boolean;
  setIsEnvelopeFlashing: React.Dispatch<React.SetStateAction<boolean>>;
  isReceiptFlashing: boolean;
  setIsReceiptFlashing: React.Dispatch<React.SetStateAction<boolean>>;
  isMoneyFlashing: boolean;
  setIsMoneyFlashing: React.Dispatch<React.SetStateAction<boolean>>;
  isReceiptClicked: boolean;
  setIsReceiptClicked: React.Dispatch<React.SetStateAction<boolean>>;
  currentCard: string;
  setCurrentCard: React.Dispatch<React.SetStateAction<string>>;
  receiptType: string;
  setReceiptType: React.Dispatch<React.SetStateAction<string>>;
  isConfiscated: boolean;
  setIsConfiscated: React.Dispatch<React.SetStateAction<boolean>>;
  cardBalance: number;
  setCardBalance: React.Dispatch<React.SetStateAction<number>>;
  depositAmount: number;
  setDepositAmount: React.Dispatch<React.SetStateAction<number>>;
}

export const CardContext = createContext<CardContextProps | undefined>(
  undefined
);

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used within a CardContextProvider");
  }
  return context;
};
