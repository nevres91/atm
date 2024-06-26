import { useEffect, useState } from "react";
import { ChooseLgGrid, alignItems } from "../styles/styles";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useCardContext } from "../context/CardContext";
import useRedirect from "../hooks/useRedirect";
import {
  fetchUserName,
  getBalance,
  setAccBalance,
} from "../functions/customFunctions";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Receipt from "./Receipt";
import { useTranslation } from "react-i18next";

const WithdrawMoneyAtm = ({
  setService,
}: {
  setService: React.Dispatch<React.SetStateAction<null | string>>;
}) => {
  const { t } = useTranslation();
  const {
    currentCard,
    cardBalance,
    setCardBalance,
    isReceiptFlashing,
    receiptType,
    setIsMoneyFlashing,
    isMoneyFlashing,
    isReceiptClicked,
  } = useCardContext();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [receiptWithdrawAmount, setReceiptWithdrawAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [date, setDate] = useState<null | string>(null);

  useRedirect(currentCard);

  useEffect(() => {
    const refreshBalance = async () => {
      if (currentCard) {
        const cardBalance = await getBalance(currentCard); //! Fetching account balance in addition to status
        if (cardBalance) {
          setCardBalance(cardBalance); //! Setting global state for balance
        }
      }
    };
    refreshBalance();
    fetchUserName(currentCard).then((userName) => {
      if (userName) {
        setUserName(userName);
      } else {
        console.log("userName doesnt exist");
      }
    });
  }, [currentCard, setCardBalance, cardBalance]);
  const onSubmit = async () => {
    setLoading(true);
    const balanceAfter = cardBalance - depositAmount - 1.25; //! Users balance after deposit
    try {
      if (balanceAfter < 0) {
        setErrorMessage("Balance too low!");
        setLoading(false);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3500);
        return;
      }
      await setAccBalance(currentCard, balanceAfter); //! Set new balance to user's account
      setTimeout(() => {
        setCardBalance(balanceAfter); //! Setting user's new balance to update UI
        setIsMoneyFlashing(true);
        setReceiptWithdrawAmount(depositAmount);
        setDate(new Date().toLocaleString());
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      {isReceiptClicked && receiptType === "withdraw" ? (
        <>
          <Receipt
            finalBalance={cardBalance}
            withdrawAmount={receiptWithdrawAmount}
            userName={userName}
            cardNumber={currentCard}
            date={date}
          />
          <Typography my={2} variant="h4">
            {t("description.part13")}
          </Typography>
        </>
      ) : (
        <Box sx={{ position: "relative", height: "100%" }}>
          <Typography
            sx={{
              background: "rgba(104, 126, 163, 0.9)",
              padding: "8px",
              textAlign: "left",
              marginTop: "-20px",
            }}
            variant="h4"
          >
            {t("description.part5")}
          </Typography>
          <Typography
            my={1}
            sx={{
              marginTop: "1%",
              color: "white",
              textAlign: "right",
              marginRight: "20px",
            }}
            variant="h5"
          >
            {t("description.part4")}: ${cardBalance}
          </Typography>
          {depositAmount > 0 && !isMoneyFlashing && !isReceiptFlashing ? (
            <Box>
              <Typography my={2} variant="h4">
                {t("description.part6")}
              </Typography>
              <Typography my={2} variant="h3">
                ${depositAmount}
              </Typography>
              <Typography my={2} variant="h5">
                {t("description.part10")} $1.25
              </Typography>
              <Typography my={2} variant="h4">
                {t("description.part7")}
              </Typography>
            </Box>
          ) : isMoneyFlashing && depositAmount > 0 && !isReceiptFlashing ? (
            <Typography my={10} variant="h4">
              {t("description.part11")}
            </Typography>
          ) : depositAmount > 0 && isReceiptFlashing && !isMoneyFlashing ? (
            <Typography my={10} variant="h4">
              {t("description.part12")}
            </Typography>
          ) : (
            <Grid sx={{ width: "100%", height: "50%" }} container my={5}>
              <ChooseLgGrid
                onClick={() => {
                  setDepositAmount(20);
                }}
                label="$20"
              />
              <ChooseLgGrid
                onClick={() => {
                  setDepositAmount(40);
                }}
                label="$40"
              />
              <ChooseLgGrid
                onClick={() => {
                  setDepositAmount(60);
                }}
                label="$60"
              />

              <ChooseLgGrid
                onClick={() => {
                  setDepositAmount(80);
                }}
                label="$80"
              />
              <ChooseLgGrid
                onClick={() => {
                  setDepositAmount(100);
                }}
                label="$100"
              />
              <ChooseLgGrid
                onClick={() => {
                  setDepositAmount(200);
                }}
                label="$200"
              />
            </Grid>
          )}
          <Button
            disabled={isMoneyFlashing || isReceiptFlashing ? true : false}
            onClick={() => onSubmit()}
            sx={{
              display: depositAmount > 0 ? "block" : "none",
              position: "absolute",
              bottom: "90px",
              right: "10%",
              marginTop: "20px",
              minHeight: "57px",
              width: "80%",
            }}
            variant="contained"
            color="success"
          >
            {loading ? (
              <CircularProgress sx={{ color: "white" }} />
            ) : (
              t("description.part8")
            )}
          </Button>
          <Button
            disabled={isMoneyFlashing || isReceiptFlashing ? true : false}
            onClick={() => setService(null)}
            sx={{
              position: "absolute",
              bottom: "20px",
              right: "10%",
              marginTop: "20px",
              minHeight: "57px",
              width: "80%",
            }}
            variant="contained"
          >
            {t("description.part9")}
          </Button>
          {errorMessage ? (
            <Box
              sx={{
                display: "flex",
                borderRadius: "6px",
                background: " rgb(250,58,58)",
                minHeight: "57px",
                width: "44%",
                minWidth: "365px",
                ...alignItems,
                margin: "auto",
                marginTop: "10px",
              }}
            >
              <ErrorOutlineOutlinedIcon sx={{ marginRight: "10px" }} />
              <Typography>{errorMessage}</Typography>
            </Box>
          ) : (
            ""
          )}
        </Box>
      )}
    </>
  );
};

export default WithdrawMoneyAtm;
