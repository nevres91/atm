import { useEffect, useState } from "react";
import { FormField } from "../styles/styles";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { useCardContext } from "../context/CardContext";
import useRedirect from "../hooks/useRedirect";
import { getBalance, setAccBalance } from "../functions/customFunctions";

const DepositMoneyAtm = ({
  service,
  setService,
}: {
  service: null | string;
  setService: React.Dispatch<React.SetStateAction<null | string>>;
}) => {
  const { currentCard, cardBalance, setCardBalance } = useCardContext();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
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
  }, [currentCard, setCardBalance, cardBalance]);
  const initialValues = {
    amount: "",
  };
  const onSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);
    const amount = parseFloat(values.amount);
    const balanceAfter = cardBalance + amount; //! Users balance after deposit
    try {
      await setAccBalance(currentCard, balanceAfter); //! Set new balance to user's account
      setTimeout(() => {
        setCardBalance(balanceAfter); //! Setting user's new balance to update UI
        resetForm();
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <Typography variant="h4">Deposit Money</Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form>
            <Paper
              elevation={20}
              sx={{
                padding: "10px",
                width: "40%",
                minWidth: "365px",
                display: "flex",
                margin: "auto",
                border: errorMessage ? "1px solid rgb(250,58,58)" : "",
                marginTop: "5%",
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
                    id="2"
                    name="amount"
                    type="number"
                    label=""
                    size="small"
                    marginLeft="54px"
                    value={parseFloat(values.amount)}
                  />
                </Typography>
                <Button
                  sx={{ margin: "25px 0", width: " 100%", height: "54px" }}
                  variant="contained"
                  type="submit"
                  color="success"
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
        )}
      </Formik>
      <Button
        onClick={() => setService(null)}
        sx={{
          marginTop: "20px",
          minHeight: "57px",
          width: "44%",
        }}
        variant="contained"
      >
        Back
      </Button>
    </>
  );
};

export default DepositMoneyAtm;
