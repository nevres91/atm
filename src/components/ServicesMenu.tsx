import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ChooseLgGrid } from "../styles/styles";
import { useCardContext } from "../context/CardContext";
import DepositMoneyAtm from "./DepositMoneyAtm";
import WithdrawMoneyAtm from "./WithdrawMoneyAtm";

const ServicesMenu = () => {
  const { currentCard, setIsEnvelopeFlashing, setDepositAmount } =
    useCardContext();
  const [service, setService] = useState<null | string>(null);
  console.log(service);
  console.log(currentCard);
  useEffect(() => {
    setDepositAmount(0);
  }, []);
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      {service === "deposit" ? (
        <DepositMoneyAtm service={service} setService={setService} />
      ) : service === "withdraw" ? (
        <WithdrawMoneyAtm service={service} setService={setService} />
      ) : (
        <>
          <Typography variant="h4">What would you like to do?:</Typography>
          <Grid
            sx={{ width: "100%", height: "80%" }}
            container
            spacing={0}
            my={5}
          >
            <ChooseLgGrid
              label="Cash WIthdrawal"
              onClick={() => setService("withdraw")}
            />
            <ChooseLgGrid
              label="Deposit"
              onClick={() => {
                setService("deposit");
                setIsEnvelopeFlashing(true);
              }}
            />
            <ChooseLgGrid
              label="Transfer"
              onClick={() => setService("transfer")}
            />
            <ChooseLgGrid
              onClick={() => setService("balance")}
              label="Balance"
            />
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ServicesMenu;
