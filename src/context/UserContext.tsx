import { createContext, useContext } from "react";

interface UserContextProps {
  uid: string;
  setUid: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
