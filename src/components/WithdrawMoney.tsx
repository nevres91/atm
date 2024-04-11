import { useState } from "react";
import { CustomContainer, FormField, MainBox } from "../styles/styles";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { useCardContext } from "../context/CardContext";
import {
  getBalance,
  getFirstNameByCardNumber,
  setAccBalance,
  successToast,
} from "../functions/customFunctions";
import { ToastContainer } from "react-toastify";
import useRedirect from "../hooks/useRedirect";
import { alignItems } from "../styles/styles";
import AccountsList from "./AccountsList";

const WithdrawMoney = () => {
  const navigate = useNavigate();
  const { currentCard, cardBalance, setCardBalance } = useCardContext();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  useRedirect(currentCard);
  const initialValues = {
    balance: cardBalance,
    amount: "",
  };
  const onSubmit = async (values: any, props: any) => {
    let { balance, amount } = values; //values comes from Formik
    const balanceAfter = balance - amount; //! Users balance after transfer
    try {
      if (balanceAfter < 0) {
        setErrorMessage("Balance too low!");
        setTimeout(() => {
          setErrorMessage(null);
        }, 2500);
        return;
      }
      await setAccBalance(currentCard, balanceAfter); //! Set new balance to user's account
      successToast("Money Transfer Successful.");
      setCardBalance(balanceAfter); //! Setting user's new balance to update UI
      setTimeout(() => {
        navigate("/inside");
      }, 2000);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <MainBox>
      <CustomContainer>
        <Typography variant="h4">Withdraw Money</Typography>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <Paper
              elevation={20}
              sx={{
                padding: "10px",
                width: "40%",
                minWidth: "365px",
                marginTop: "5%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: errorMessage ? "1px solid rgb(250,58,58)" : "",
                boxShadow: errorMessage
                  ? "0px 0px 25px 2px rgba(250,58,58,0.75)"
                  : "",
              }}
            >
              <Box
                sx={{
                  maxWidth: "350px",
                  height: "225px",
                }}
              >
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  my={2}
                  align="left"
                  variant="h5"
                >
                  Balance:
                  <FormField
                    id="1"
                    name="balance"
                    type="number"
                    label=""
                    value={cardBalance}
                    size="small"
                    marginLeft="50px"
                    disabled={true}
                  />
                </Typography>
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  my={2}
                  align="left"
                  variant="h5"
                >
                  Amount:{"    "}
                  <FormField
                    id="1"
                    name="amount"
                    type="number"
                    label=""
                    size="small"
                    marginLeft="54px"
                  />
                </Typography>
                <ToastContainer />
                <Button
                  sx={{ margin: "10px 0", width: " 100%", height: "54px" }}
                  variant="contained"
                  type="submit"
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Withdraw"
                  )}
                </Button>
              </Box>
            </Paper>
          </Form>
        </Formik>
        <Button
          onClick={() => navigate("/inside")}
          sx={{
            marginTop: "20px",
            minHeight: "57px",
            width: "40%",
            minWidth: "365px",
          }}
          variant="contained"
        >
          Back
        </Button>
        {errorMessage ? (
          <Box
            sx={{
              display: "flex",
              borderRadius: "6px",
              background: " rgb(250,58,58)",
              minHeight: "57px",
              width: "40%",
              minWidth: "365px",
              ...alignItems,
              marginTop: "10px",
            }}
          >
            <ErrorOutlineOutlinedIcon sx={{ marginRight: "10px" }} />
            <Typography>{errorMessage}</Typography>
          </Box>
        ) : (
          ""
        )}
      </CustomContainer>
    </MainBox>
  );
};

export default WithdrawMoney;
