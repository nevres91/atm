import { Typography } from "@mui/material";
import { useCardContext } from "../context/CardContext";
import { getBalance } from "../functions/customFunctions";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const ShowPin = () => {
  const { currentCard } = useCardContext();
  const [balance, setBalance] = useState<number | undefined>(undefined);

  useEffect(() => {
    const CardBalance = async () => {
      const balance = await getBalance(currentCard);
      setBalance(balance);
    };
    CardBalance();
  }, []);

  return (
    <>
      <Typography my={5} variant="h4">
        Your PIN Number is:
      </Typography>
      <Typography variant="h2">${balance} </Typography>
      <ToastContainer />
    </>
  );
};

export default ShowPin;
