import { useEffect, useState } from "react";
import {
  CustomContainer,
  FormField,
  MainBox,
  alignItems,
} from "../styles/styles";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Formik, Form } from "formik";
import { useCardContext } from "../context/CardContext";
import useRedirect from "../hooks/useRedirect";
import {
  getBalance,
  setAccBalance,
  successToast,
} from "../functions/customFunctions";

const DepositMoney = () => {
  const navigate = useNavigate();
  const { currentCard, cardBalance, setCardBalance } = useCardContext();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [deposited, setDeposited] = useState(false);
  useRedirect(currentCard);
  useEffect(() => {
    const refreshBalance = async () => {
      if (currentCard) {
        const cardBalance = await getBalance(currentCard); //! Fetching account balance in addition to status
        if (cardBalance) {
          setCardBalance(cardBalance); //! Setting global state for balance
          console.log("card Balance is: " + cardBalance);
        }
      }
    };
    refreshBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCard, cardBalance]);
  const initialValues = {
    balance: cardBalance,
    amount: "",
  };
  const onSubmit = async (values: any) => {
    setLoading(true);
    let { balance, amount } = values; //values comes from Formik
    amount = Number(amount);
    const balanceAfter = balance + amount; //! Users balance after deposit
    try {
      if (amount === "" || amount === 0 || amount < 0) {
        setErrorMessage("Please enter a valid amount.");
        setLoading(false);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
        return;
      }
      await setAccBalance(currentCard, balanceAfter); //! Set new balance to user's account
      setTimeout(() => {
        successToast("Money Deposit Successful.");
        setCardBalance(balanceAfter); //! Setting user's new balance to update UI
        setLoading(false);
        setDeposited(true);
      }, 1500);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <MainBox>
      {deposited ? (
        <>
          <CustomContainer>
            <Box
              sx={{
                height: "80%",
                width: "60%",
                display: "flex",
                flexDirection: "column",
                ...alignItems,
              }}
            >
              <Typography variant="h4" sx={{ color: "white" }}>
                Money Deposit Successfull
              </Typography>
              <Button
                onClick={() => {
                  navigate("/inside");
                  setDeposited(false);
                }}
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
            </Box>
          </CustomContainer>
        </>
      ) : (
        <CustomContainer>
          <Typography variant="h4">Deposit Money</Typography>
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
                      "Deposit"
                    )}
                  </Button>
                </Box>
              </Paper>
            </Form>
          </Formik>
          <Button
            onClick={() => navigate("/inside")}
            sx={{ marginTop: "20px", minHeight: "57px", width: "40%" }}
            variant="contained"
          >
            Back
          </Button>
          {errorMessage ? (
            <Button
              sx={{
                marginTop: "20px",
                minHeight: "57px",
                width: "40%",
                cursor: "initial",
              }}
              variant="contained"
              color="error"
            >
              {errorMessage}
            </Button>
          ) : (
            ""
          )}
        </CustomContainer>
      )}
    </MainBox>
  );
};

export default DepositMoney;
