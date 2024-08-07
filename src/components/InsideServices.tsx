import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { InsideMenu, LeaveBankBtn } from "../styles/styles";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { getAuth } from "firebase/auth";
import BankCard from "./BankCard";
import { useCardContext } from "../context/CardContext";
import useUserData from "../hooks/useUserData";
import { useEffect, useState } from "react";
import AccountBalance from "./AccountBalance";
import { getBalance, getConfiscateStatus } from "../functions/customFunctions";

// *The services a customer gets when succesfully logged in.
const InsideServices = () => {
  const auth = getAuth();
  const { uid, setUid } = useUserContext();
  const {
    setCardBalance,
    currentCard,
    isConfiscated,
    setIsConfiscated,
    cardBalance,
  } = useCardContext();
  const navigate = useNavigate();
  const { userName } = useUserData(uid);
  const [showBalance, setShowBalance] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("card Number: " + currentCard);
  console.log("Card Balance: " + cardBalance);

  useEffect(() => {
    const getConfStatus = async () => {
      if (currentCard) {
        const cardBalance = await getBalance(currentCard); //! Fetching account balance in addition to status
        const status = await getConfiscateStatus(currentCard);
        console.log("cardBalance: " + cardBalance);
        if (cardBalance !== null && cardBalance !== undefined) {
          setCardBalance(cardBalance); //! Setting global state for balance
          console.log("card balance true!");
        }
        setIsConfiscated(status);
      }
    };
    getConfStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCard, cardBalance]);

  const signOut = () => {
    auth.signOut().then(() => {
      setUid("");
      navigate("/");
    });
  };
  return (
    <Box
      bgcolor="#004385"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // border: "3px solid blue",
      }}
    >
      <Typography variant="h4">
        Hello customer, what would you like to do?
        <Grid container my={4} spacing={2}>
          <InsideMenu
            disabled={!isConfiscated}
            onClick={() => navigate("/inside/card_recovery")}
            width={6}
            label="Card Confiscated"
          />
          <InsideMenu
            disabled={isConfiscated}
            color={showBalance ? "#0A367B" : ""}
            onClick={() => {
              if (!isConfiscated) {
                if (showBalance) {
                  setShowBalance(false);
                } else {
                  setLoading(true);
                  setTimeout(() => {
                    setShowBalance(!showBalance);
                    setLoading(false);
                  }, 1500);
                }
              }
            }}
            width={6}
            label="Balance"
          />
          <InsideMenu
            onClick={() => {
              if (!isConfiscated) {
                navigate("/inside/transfer");
              }
            }}
            disabled={isConfiscated}
            width={6}
            label="Transfer"
          />
          <InsideMenu
            onClick={() => {
              if (!isConfiscated) {
                navigate("/inside/deposit");
              }
              setCardBalance(cardBalance);
            }}
            disabled={isConfiscated}
            width={6}
            label="Deposit"
          />
          <InsideMenu
            onClick={() => {
              if (!isConfiscated) {
                navigate("/inside/withdraw");
              }
            }}
            disabled={isConfiscated}
            width={6}
            label="Withdraw"
          />
          <InsideMenu
            disabled={isConfiscated}
            width={6}
            label="Change Pin"
            onClick={() => {
              if (!isConfiscated) {
                navigate("/inside/change_pin");
              }
            }}
          />
        </Grid>
      </Typography>

      {showBalance ? (
        <AccountBalance />
      ) : loading ? (
        <CircularProgress size={80} sx={{ color: "white", marginTop: "5%" }} />
      ) : (
        <BankCard userName={userName} cardNumber={currentCard} />
      )}
      <LeaveBankBtn text="LEAVE THE BANK" onClick={signOut} />
    </Box>
  );
};

export default InsideServices;
