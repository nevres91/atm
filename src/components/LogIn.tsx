import { Box, Typography, Paper, Button, ThemeProvider } from "@mui/material";
import { Formik, Form } from "formik";
import {
  CustomContainer,
  FormField,
  LeaveBankBtn,
  theme,
} from "../styles/styles";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useUserContext } from "../context/UserContext";
import { errorToast, successToast } from "../functions/customFunctions";
import InsideServices from "./InsideServices";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LogIn = () => {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const navigate = useNavigate();
  const { uid, setUid } = useUserContext();
  const auth = getAuth();
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: any) => {
    const { email, password } = values;
    // const db = getFirestore(app);

    // !SignIn
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUid(user.uid);
      successToast("Logged in Successfully.");
    } catch (error: any) {
      const { code, message } = error;

      errorToast(`${code} ${message}`);
      setUid("");

      if (code === "auth/invalid-credential") {
        console.log("invalid Credentials");
        setErrorMessage("Invalid Credentials!");
      } else {
        console.log("An unknown error occurred. CODE: +" + code);
      }
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <CustomContainer>
        {uid.length < 4 ? (
          <>
            <Typography variant="h4">
              Hello Customer, what would you like to do?
            </Typography>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              <Paper
                elevation={20}
                sx={{
                  padding: "10px",
                  width: "40%",
                  marginTop: "5%",
                  border: errorMessage ? "2px solid red" : "",
                  boxShadow: errorMessage
                    ? "0px 0px 32px 5px rgba(247,9,9,0.75)"
                    : "",
                }}
              >
                <Typography variant="h5">
                  Log in to an existing account.
                </Typography>
                <Form>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <FormField
                      id="2"
                      name="email"
                      type="email"
                      label="E-mail"
                      onInput={() => setErrorMessage(null)}
                    />
                    <FormField
                      id="4"
                      name="password"
                      type="password"
                      label="Password"
                      onInput={() => setErrorMessage(null)}
                    />
                    <Button
                      sx={{ margin: "10px 0", width: " 100%", height: "54px" }}
                      variant="contained"
                      type="submit"
                      color={errorMessage ? "error" : "primary"}
                    >
                      {errorMessage ? errorMessage : "LOGIN"}
                    </Button>
                  </Box>
                </Form>
              </Paper>
            </Formik>
            <Typography sx={{ marginTop: "5%" }} variant="h5">
              I want to create a new account.
            </Typography>
            <Button
              onClick={() => navigate("/inside/create")}
              sx={{ width: "40%", height: "55px", marginTop: "10px" }}
              variant="contained"
            >
              REGISTER
            </Button>
            <LeaveBankBtn text="LEAVE THE BANK" onClick={() => navigate("/")} />
          </>
        ) : (
          <InsideServices />
        )}
      </CustomContainer>
    </ThemeProvider>
  );
};

export default LogIn;
