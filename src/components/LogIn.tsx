import React, { useState } from "react";
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
import { useCardContext } from "../context/CardContext";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "../firebaseConfig";

const LogIn = () => {
  const navigate = useNavigate();
  const { uid, setUid } = useUserContext();
  const { currentCard, setCurrentCard } = useCardContext();
  const auth = getAuth();
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: any) => {
    const { email, password } = values;
    // const db = getFirestore(app);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUid(user.uid);
        console.log(user.uid);
        successToast("Loged in Successfully.");
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        errorToast(`${errorMessage}`);
        setUid("");
        console.log("Error UID", uid);
      });
    // console.log(uid);
    // const usersData = await getDoc(doc(db, "users", `${uid}`));
    // if (usersData.exists()) {
    //   const cardNumber = usersData.data().cardNumber;
    //   setCurrentCard(cardNumber);
    //   console.log(currentCard);
    // }

    console.log("Login submitted!");
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
                    />
                    <FormField
                      id="4"
                      name="password"
                      type="password"
                      label="Password"
                    />
                    <Button
                      sx={{ margin: "10px 0", width: " 100%", height: "54px" }}
                      variant="contained"
                      type="submit"
                    >
                      Login
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
