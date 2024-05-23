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

const DepositMoneyAtm = ({
  service,
  setService,
}: {
  service: null | string;
  setService: React.Dispatch<React.SetStateAction<null | string>>;
}) => {
  console.log("deposit money rendered");
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
    setIsReceiptClicked,
    isReceiptClicked,
  } = useCardContext();
  const [moneyToDeposit, setMoneyToDeposit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
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
    console.log("current card is:" + currentCard);
    fetchUserName(currentCard).then((userName) => {
      if (userName) {
        setUserName(userName);
      } else {
        console.log("userName doesnt exist");
      }
    });
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
        setDate(new Date().toLocaleString());
      }, 2000);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      {isReceiptClicked ? (
        <>
          <Receipt
            finalBalance={cardBalance}
            depositAmount={receiptDepositAmount}
            userName={userName}
            cardNumber={currentCard}
            date={date}
          />
          <Typography my={2} variant="h4">
            Please Take Out Your Card!
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
          <Typography variant="h4">DEPOSIT MONEY</Typography>
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
              Your Current Balance is:
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
                  Your amount to deposit is:
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
                    "Deposit"
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
                  Add More
                </Button>
                {isEnvelopeFlashing ? (
                  <Typography sx={{ color: "white" }} my={1} variant="h5">
                    Please Insert Your Money.
                  </Typography>
                ) : (
                  ""
                )}
              </>
            ) : (
              <Typography sx={{ color: "white" }} my={10} variant="h4">
                Please Insert Your Money.
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
            Back
          </Button>
        </Box>
      )}
    </>
  );
};

export default DepositMoneyAtm;
