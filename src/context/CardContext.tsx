import { createContext, useContext } from "react";

interface CardContextProps {
  isCardValid: boolean;
  setIsCardValid: React.Dispatch<React.SetStateAction<boolean>>;
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
