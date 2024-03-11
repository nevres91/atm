import { Box, Grid, Typography } from "@mui/material";
import { InsideMenu, LeaveBankBtn } from "../styles/styles";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { getAuth } from "firebase/auth";
import BankCard from "./BankCard";
import { useCardContext } from "../context/CardContext";
import useUserData from "../hooks/useUserData";

// !Services a customer is getting when succesfully logged in.
const InsideServices = () => {
  const auth = getAuth();
  const { uid, setUid } = useUserContext();
  const { currentCard } = useCardContext();
  const navigate = useNavigate();
  const { userName } = useUserData(uid);

  const signOut = () => {
    auth.signOut().then(() => {
      console.log("user signed out");
      setUid("");
      navigate("/");
    });
  };
  console.log(currentCard);
  console.log(uid);
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
            onClick={() => navigate("/inside/card_recovery")}
            width={6}
            label="Card Confiscated"
          />
          {/* <InsideMenu
            onClick={() => navigate("/inside/create")}
            width={6}
            label="Create an account"
          /> */}
          <InsideMenu width={6} label="Balance" />
          <InsideMenu width={6} label="Transfer" />
          <InsideMenu width={6} label="Deposit" />
          <InsideMenu width={12} label="Change Pin" />
          {/* <InsideMenu onClick={signOut} width={12} label="Leave the bank" /> */}
        </Grid>
      </Typography>
      <BankCard userName={userName} cardNumber={currentCard} />
      <LeaveBankBtn text="LEAVE THE BANK" onClick={signOut} />
    </Box>
  );
};

export default InsideServices;
