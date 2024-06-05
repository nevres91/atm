import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ChooseLgGrid } from "../styles/styles";
import { useCardContext } from "../context/CardContext";
import DepositMoneyAtm from "./DepositMoneyAtm";
import WithdrawMoneyAtm from "./WithdrawMoneyAtm";
import BalanceAtm from "./BalanceAtm";
import TransferMoneyAtm from "./TransferMoneyAtm";
import ChoseLg from "./ChooseLg";
import { useTranslation } from "react-i18next";

const ServicesMenu = () => {
  const { t } = useTranslation();
  const { setIsEnvelopeFlashing, setDepositAmount, setReceiptType } =
    useCardContext();
  const [service, setService] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setService("language");
    setDepositAmount(0);
  }, []);
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      {service === "language" ? (
        <ChoseLg setService={setService} setLoading={setLoading} />
      ) : service === "deposit" ? (
        <DepositMoneyAtm setService={setService} />
      ) : service === "transfer" ? (
        <TransferMoneyAtm setService={setService} />
      ) : service === "withdraw" ? (
        <WithdrawMoneyAtm setService={setService} />
      ) : service === "balance" ? (
        <BalanceAtm />
      ) : loading ? (
        <CircularProgress
          size={80}
          sx={{
            color: "white",
            margin: "20% auto",
          }}
        />
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
              label={t("description.part1")}
              onClick={() => setService("withdraw")}
            />
            <ChooseLgGrid
              label={t("description.part2")}
              onClick={() => {
                setService("deposit");
                setIsEnvelopeFlashing(true);
              }}
            />
            <ChooseLgGrid
              label={t("description.part3")}
              onClick={() => setService("transfer")}
            />
            <ChooseLgGrid
              onClick={() => {
                setService("balance");
                setReceiptType("balance");
              }}
              label={t("description.part4")}
            />
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ServicesMenu;
