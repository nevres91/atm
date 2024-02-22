import { useState } from "react";

export const useInsertCard = () => {
  const [cardIn, setCardIn] = useState(false);

  const insertCard = () => {
    setCardIn(!cardIn);
  };
  return { cardIn, insertCard };
};
