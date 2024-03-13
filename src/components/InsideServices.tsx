import { Box, Grid, Typography } from "@mui/material";
import { InsideMenu, LeaveBankBtn } from "../styles/styles";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { getAuth } from "firebase/auth";
import BankCard from "./BankCard";
import { useCardContext } from "../context/CardContext";
import useUserData from "../hooks/useUserData";
import { useEffect, useState } from "react";
import AccountBalance from "./AccountBalance";
import { getConfiscateStatus } from "../functions/customFunctions";

// *The services a customer gets when succesfully logged in.
const InsideServices = () => {
  const auth = getAuth();
  const { uid, setUid } = useUserContext();
  const { currentCard, isConfiscated, setIsConfiscated } = useCardContext();
  const navigate = useNavigate();
  const { userName } = useUserData(uid);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    const getConfStatus = async () => {
      if (currentCard) {
        const status = await getConfiscateStatus(currentCard);
        setIsConfiscated(status);
      }
    };
    getConfStatus();
  }, []);

  const signOut = () => {
    auth.signOut().then(() => {
      console.log("user signed out");
      setUid("");
      navigate("/");
    });
  };
  return (
    <Box
      bgcolor="#004385"
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
                setShowBalance(!showBalance);
              }
            }}
            width={6}
            label="Balance"
          />
          <InsideMenu disabled={isConfiscated} width={6} label="Transfer" />
          <InsideMenu disabled={isConfiscated} width={6} label="Deposit" />
          <InsideMenu disabled={isConfiscated} width={12} label="Change Pin" />
        </Grid>
      </Typography>

      {showBalance ? (
        <AccountBalance />
      ) : (
        <BankCard userName={userName} cardNumber={currentCard} />
      )}
      <LeaveBankBtn text="LEAVE THE BANK" onClick={signOut} />
    </Box>
  );
};

export default InsideServices;
