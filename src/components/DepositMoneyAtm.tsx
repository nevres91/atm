import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useCardContext } from "../context/CardContext";
import useRedirect from "../hooks/useRedirect";
import {
  fetchUserName,
  getBalance,
  setAccBalance,
} from "../functions/customFunctions";
import Receipt from "./Receipt";
import { useTranslation } from "react-i18next";

const DepositMoneyAtm = ({
  setService,
}: {
  setService: React.Dispatch<React.SetStateAction<null | string>>;
}) => {
  const { t } = useTranslation();
  const {
    currentCard,
    cardBalance,
    setCardBalance,
    isEnvelopeFlashing,
    setIsEnvelopeFlashing,
    depositAmount,
    setDepositAmount,
    setIsReceiptFlashing,
    isReceiptFlashing,
    isReceiptClicked,
    setReceiptType,
    receiptType,
  } = useCardContext();
  const [moneyToDeposit, setMoneyToDeposit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState<null | string>(null);
  const [receiptDepositAmount, setReceiptDepositAmount] = useState(0);
  useRedirect(currentCard);

  useEffect(() => {
    if (depositAmount > 0) {
      setMoneyToDeposit(depositAmount + moneyToDeposit);
      setReceiptDepositAmount(depositAmount + moneyToDeposit);
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCard, setCardBalance, cardBalance, depositAmount]);

  const onSubmit = async () => {
    setLoading(true);
    const balanceAfter = cardBalance + moneyToDeposit; //! Users balance after deposit
    try {
      await setAccBalance(currentCard, balanceAfter); //! Set new balance to user's account
      setTimeout(() => {
        setCardBalance(balanceAfter); //! Setting user's new balance to update UI
        setMoneyToDeposit(0);
        setDepositAmount(0);
        setIsEnvelopeFlashing(false);
        setLoading(false);
        setIsReceiptFlashing(true);
        setReceiptType("deposit");
        setDate(new Date().toLocaleString());
      }, 2000);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      {isReceiptClicked && receiptType === "deposit" ? (
        <>
          <Receipt
            finalBalance={cardBalance}
            depositAmount={receiptDepositAmount}
            userName={userName}
            cardNumber={currentCard}
            date={date}
          />
          <Typography my={2} variant="h4">
            {t("description.part13")}
          </Typography>
        </>
      ) : isReceiptFlashing ? (
        <>
          <Typography my={4} variant="h4">
            {t("description.part14")}
          </Typography>
          <Typography variant="h3">{cardBalance} $</Typography>
          <Typography my={8} variant="h4">
            {t("description.part12")}
          </Typography>
        </>
      ) : (
        <Box
          sx={{
            position: "relative",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              background: "rgba(104, 126, 163, 0.9)",
              padding: "10px",
              textAlign: "left",
            }}
            variant="h4"
          >
            {t("description.part2")}
          </Typography>
          <Paper
            elevation={20}
            sx={{
              width: "70%",
              margin: "auto",
              marginTop: "2%",
              background: "rgba(189, 235, 255, 0.3)",
              padding: "2%",
            }}
          >
            <Typography
              my={1}
              sx={{ marginTop: "5%", color: "white" }}
              variant="h5"
            >
              {t("description.part15")}
            </Typography>
            <Typography
              sx={{ marginBottom: "5%", color: "white" }}
              variant="h4"
            >
              $ {cardBalance}
            </Typography>
            {moneyToDeposit > 0 ? (
              <>
                <Typography my={1} variant="h5" sx={{ color: "white" }}>
                  {t("description.part16")}
                </Typography>
                <Typography sx={{ color: "white" }} variant="h4">
                  $ {moneyToDeposit}
                </Typography>
                <Button
                  onClick={() => onSubmit()}
                  variant="contained"
                  color="success"
                  sx={{
                    width: "45%",
                    margin: "15px 5px",
                    minHeight: "57px",
                  }}
                >
                  {loading ? (
                    <CircularProgress sx={{ color: "white" }} />
                  ) : (
                    t("description.part2")
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setIsEnvelopeFlashing(true);
                  }}
                  variant="contained"
                  color="success"
                  sx={{
                    width: "45%",
                    margin: "5px",
                    minHeight: "57px",
                  }}
                >
                  {t("description.part17")}
                </Button>
                {isEnvelopeFlashing ? (
                  <Typography sx={{ color: "white" }} my={1} variant="h5">
                    {t("description.part18")}
                  </Typography>
                ) : (
                  ""
                )}
              </>
            ) : (
              <Typography sx={{ color: "white" }} my={10} variant="h4">
                {t("description.part18")}
              </Typography>
            )}
          </Paper>

          <Button
            onClick={() => {
              setService(null);
              setIsEnvelopeFlashing(false);
              setMoneyToDeposit(0);
              setDepositAmount(0);
            }}
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
        </Box>
      )}
    </>
  );
};

export default DepositMoneyAtm;
