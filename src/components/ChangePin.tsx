import { useState } from "react";
import { CustomContainer, MainBox } from "../styles/styles";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Formik, Form, Field } from "formik";
import { useCardContext } from "../context/CardContext";
import useRedirect from "../hooks/useRedirect";
import {
  setPin,
  successToast,
  validatePin,
} from "../functions/customFunctions";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { alignItems } from "../styles/styles";

const ChangePin = () => {
  const navigate = useNavigate();
  const { currentCard } = useCardContext();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [NewPinErrorMessage, setNewPinErrorMessage] = useState<null | string>(
    null
  );
  useRedirect(currentCard);
  const initialValues = {
    currentPin: "",
    newPin: "",
  };
  const onSubmit = async (values: any, { resetForm }: { resetForm: any }) => {
    setLoading(true);
    let { currentPin, newPin } = values; //values comes from Formik
    try {
      const curPin = await validatePin(currentPin);
      if (!curPin) {
        console.log("wrong pin entered");
        setErrorMessage("Wrong PIN entered");
        setLoading(false);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2500);
        return;
      }
      if (newPin === "" || newPin.length < 4) {
        setNewPinErrorMessage("Please enter a valid pin");
        setLoading(false);
        return;
      }
      if (newPin === currentPin) {
        setNewPinErrorMessage("Please use a different PIN from current one.");
        setLoading(false);
        return;
      }
      setTimeout(() => {
        setPin(currentPin, newPin);
        setLoading(false);
        setErrorMessage(null);
        setNewPinErrorMessage(null);
        resetForm();
        successToast("Pin Changed Successfuly.");
      }, 1500);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Limit Input to only 4 numbers.
  const handleInput = (e: any) => {
    let inputValue = e.target.value.replace(/[^0-9]/g, "");
    inputValue = inputValue.slice(0, 4);
    e.target.value = inputValue;
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
                margin: "5% auto 5% auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: errorMessage ? "1px solid rgb(250,58,58)" : "",
                boxShadow: errorMessage
                  ? "0px 0px 25px 2px rgba(250,58,58,0.75)"
                  : "",
                height: "90%",
              }}
            >
              <Box
                sx={{
                  maxWidth: "400px",
                  height: "100%",
                }}
              >
                <Field
                  as={TextField}
                  name="currentPin"
                  type="tel"
                  variant="outlined"
                  label="Current Pin"
                  required
                  onInput={handleInput}
                  onClick={() => setErrorMessage(null)}
                  size="small"
                  letterSpacing="15px"
                  fontWeight="900"
                  fontSize="20px"
                  padding="5px"
                  helperText={errorMessage ? `${errorMessage}` : ""}
                  sx={{ margin: "20px auto 20px auto", width: "60%" }}
                  InputProps={{
                    style: {
                      padding: "5px",
                      background: errorMessage
                        ? "rgba(255, 184, 184, 1)"
                        : "rgba(241, 242, 237, 0.5)",
                      borderRadius: "5px",
                      width: "100%",
                    },
                  }}
                  inputProps={{
                    style: {
                      color: "rgba(47, 72, 148, 0.9)",
                      textAlign: "center",
                      fontWeight: "900",
                      fontSize: "20px",
                      letterSpacing: "15px",
                    },
                  }}
                  FormHelperTextProps={{
                    sx: {
                      color: "#EF5350",
                      marginLeft: "0",
                    },
                  }}
                />
                <Field
                  as={TextField}
                  name="newPin"
                  type="tel"
                  variant="outlined"
                  label="New Pin"
                  required
                  onInput={handleInput}
                  onClick={() => setNewPinErrorMessage(null)}
                  size="small"
                  letterSpacing="15px"
                  fontWeight="900"
                  fontSize="20px"
                  padding="5px"
                  helperText={NewPinErrorMessage ? `${NewPinErrorMessage}` : ""}
                  sx={{ margin: "20px auto 20px auto", width: "60%" }}
                  InputProps={{
                    style: {
                      padding: "5px",
                      background: NewPinErrorMessage
                        ? "rgba(255, 184, 184, 1)"
                        : "rgba(241, 242, 237, 0.5)",
                      borderRadius: "5px",
                      width: "100%",
                    },
                  }}
                  inputProps={{
                    style: {
                      color: "rgba(47, 72, 148, 0.9)",
                      textAlign: "center",
                      fontWeight: "900",
                      fontSize: "20px",
                      letterSpacing: "15px",
                    },
                  }}
                  FormHelperTextProps={{
                    sx: {
                      color: "#EF5350",
                      marginLeft: "0",
                    },
                  }}
                />
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
              margin: "10px auto 10px auto",
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
