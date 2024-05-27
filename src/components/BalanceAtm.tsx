import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useCardContext } from "../context/CardContext";
import useRedirect from "../hooks/useRedirect";
import { fetchUserName, getBalance } from "../functions/customFunctions";
import Receipt from "./Receipt";

const BalanceAtm = () => {
  const {
    currentCard,
    cardBalance,
    setCardBalance,
    setIsReceiptFlashing,
    receiptType,
    isReceiptClicked,
  } = useCardContext();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState<null | string>(null);

  useRedirect(currentCard);

  useEffect(() => {
    setLoading(true);
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
    setTimeout(() => {
      setLoading(false);
      setIsReceiptFlashing(true);
      setDate(new Date().toLocaleString());
    }, 2500);
  }, [currentCard, setCardBalance, cardBalance]);

  return (
    <>
      {isReceiptClicked && receiptType === "balance" ? (
        <>
          <Receipt
            finalBalance={cardBalance}
            userName={userName}
            cardNumber={currentCard}
            date={date}
          />
          <Typography my={2} variant="h4">
            Please Take Out Your Card!
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
            Balance
          </Typography>
          {loading ? (
            <>
              <Typography my={10} variant="h4">
                Proccesing
              </Typography>
              <CircularProgress />
            </>
          ) : (
            <Typography my={10} variant="h4">
              Your Receipt is ready!
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default BalanceAtm;
