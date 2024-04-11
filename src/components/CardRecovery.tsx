import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { CustomContainer, MainBox, alignItems } from "../styles/styles";
import { useCardContext } from "../context/CardContext";
import BankCard from "./BankCard";
import { useUserContext } from "../context/UserContext";
import useUserData from "../hooks/useUserData";
import {
  setConfiscateStatus,
  successToast,
} from "../functions/customFunctions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import noCard from "../img/nocard2.png";
import { ToastContainer } from "react-toastify";
import useRedirect from "../hooks/useRedirect";

const CardRecovery = () => {
  const { currentCard, setIsConfiscated } = useCardContext();
  const { uid } = useUserContext();
  const { userName, isConfiscated } = useUserData(uid);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleClick = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setConfiscateStatus(currentCard, false);
    successToast("Your card was returned succesfully.");
    setLoading(false);
    setIsConfiscated(false); //!to force rerender
  };
  useRedirect(currentCard); //! Redirect if theres no user

  return (
    <MainBox>
      <CustomContainer>
        <Typography my={5} variant="h4">
          {isConfiscated
            ? "It seems like your card was retained in the atm"
            : "Sorry, your card can't be found in our retainer box"}{" "}
        </Typography>
        {isConfiscated ? (
          <>
            <BankCard userName={userName} cardNumber={currentCard} />
            <Button
              sx={{ marginTop: "20px", height: "47px", width: "550px" }}
              variant="contained"
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Get Card"
              )}
            </Button>
          </>
        ) : (
          <>
            <Paper
              elevation={0}
              sx={{
                background: `url(${noCard}) no-repeat center center/cover`,
                minWidth: "550px",
                minHeight: "415px",
              }}
            />
            <Button
              onClick={() => navigate("/inside")}
              sx={{ marginTop: "20px", height: "47px", width: "550px" }}
              variant="contained"
            >
              Back
            </Button>
          </>
        )}
        <ToastContainer />
      </CustomContainer>
    </MainBox>
  );
};

export default CardRecovery;
