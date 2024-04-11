import { useState } from "react";
import { CustomContainer, FormField, MainBox } from "../styles/styles";
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
  setAccBalance,
  successToast,
  validatePin,
} from "../functions/customFunctions";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { alignItems } from "../styles/styles";

const ChangePin = () => {
  const navigate = useNavigate();
  const { currentCard, cardBalance, setCardBalance } = useCardContext();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  useRedirect(currentCard);
  const initialValues = {
    currentPin: "",
    newPin: "",
  };
  const onSubmit = async (values: any, props: any) => {
    let { currentPin, newPin } = values; //values comes from Formik
    try {
      const curPin = await validatePin(currentPin);
      if (!curPin) {
        console.log("wrong pin entered");
        setErrorMessage("Wrong PIN entered");
        setTimeout(() => {
          setErrorMessage(null);
        }, 2500);
        return;
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Limit Input to only 4 numbers.
  const handleInput = (e: any) => {
    let inputValue = e.target.value.replace(/[^0-9]/g, "");
    inputValue = inputValue.slice(0, 4);
    e.target.value = inputValue;
    if (inputValue === 4) {
      console.log("last number is entered");
    }
    e.preventDefault();
  };

  return (
    <MainBox>
      <CustomContainer>
        <Typography variant="h4">Change your PIN</Typography>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <Paper
              elevation={20}
              sx={{
                padding: "10px",
                width: "100%",
                minWidth: "430px",
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
                  maxWidth: "450px",
                  height: "225px",
                }}
              >
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  my={2}
                  align="left"
                  variant="h5"
                >
                  Current PIN:
                  <FormField
                    id="1"
                    name="currentPin"
                    type="tel"
                    label=""
                    size="small"
                    marginLeft="30px"
                    letterSpacing="15px"
                    fontWeight="900"
                    fontSize="20px"
                    padding="5px"
                    textAlign="center"
                    onInput={handleInput}
                  />
                </Typography>
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  my={2}
                  align="left"
                  variant="h5"
                >
                  New PIN:{"    "}
                  <FormField
                    id="1"
                    name="newPin"
                    type="tel"
                    label=""
                    size="small"
                    marginLeft="62px"
                    letterSpacing="15px"
                    fontWeight="900"
                    fontSize="20px"
                    padding="5px"
                    textAlign="center"
                    onInput={handleInput}
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
                    "Submit"
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
            minWidth: "430px",
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
              minWidth: "430px",
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

export default ChangePin;
