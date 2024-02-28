import { createContext, useContext } from "react";

interface PinContextProps {
  isPinValid: boolean;
  setIsPinValid: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PinContext = createContext<PinContextProps | undefined>(undefined);

export const usePinContext = () => {
  const context = useContext(PinContext);
  if (!context) {
    throw new Error("usePinContext must be used within a PinContextProvider");
  }
  return context;
};
