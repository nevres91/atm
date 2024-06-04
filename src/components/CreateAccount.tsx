import {
  Box,
  Typography,
  Paper,
  Button,
  ThemeProvider,
  CircularProgress,
  TextField,
} from "@mui/material";
import {
  CustomContainer,
  FormField,
  GenderRadio,
  LeaveBankBtn,
  theme,
} from "../styles/styles";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "../firebaseConfig";
import app from "../firebaseConfig";
import {
  getFirestore,
  collection,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import {
  errorToast,
  generateUniqueNumber,
  successToast,
} from "../functions/customFunctions";
import { generateUniquePinNumber } from "../functions/customFunctions";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { ToastContainer } from "react-toastify";

const CreateAccount = () => {
  const [gender, setGender] = useState("Male");
  const [loading, setLoading] = useState(false);
  const { uid, setUid } = useUserContext();
  const [errorEmailMessage, setErrorEmailMessage] = useState<null | string>(
    null
  );
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<
    null | string
  >(null);

  const navigate = useNavigate();
  const initialValues = {
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    password2: "",
  };

  const handleGenderChange = (gender: string) => {
    setGender(gender);
    console.log(gender);
  };

  const onSubmit = async (values: any, props: any) => {
    setLoading(true);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const cardNumber = generateUniqueNumber();
    const pinNumber = generateUniquePinNumber();
    const { email, password, FirstName, LastName } = values; //values comes from Formik
    console.log(email);
    try {
      // *Registering a user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user.uid);

      // *Writting data to "user" database
      const docRefUsers = doc(collection(db, "users"), user.uid);

      await setDoc(docRefUsers, {
        firstName: FirstName,
        lastName: LastName,
        emailAdress: email,
        cardNumber,
        gender: gender,
      });
      console.log("Document user written with id:", docRefUsers.id);
      console.log("the gender after registration:", gender);

      // *Writting data to "CardNumbers" database
      const docRefCardNumber = await setDoc(
        doc(db, "cardNumbers", `${cardNumber}`),
        {
          fullName: `${FirstName} ${LastName}`,
          pin: pinNumber,
          isConfiscated: false,
        }
      );

      // *Writting data to "transactions" database
      const docRefTransactions = await setDoc(
        doc(db, "transactions", `${cardNumber}`),
        {
          balance: 0,
          transactions: {
            withdrawal: {
              amount: 0,
              date: new Date(),
              totalBalance: 0,
            },
            deposit: {
              amount: 0,
              date: new Date(),
              totalBalance: 0,
            },
            transfer: {
              to: "",
              amount: 0,
              date: new Date(),
              totalBalance: 0,
            },
          },
        }
      );
      // todo //Get Document data
      const cardNumberDoc = await getDoc(
        doc(db, "cardNumbers", `${cardNumber}`)
      );
      console.log(cardNumberDoc.data());
      if (cardNumberDoc.exists()) {
        const cardNumberData = cardNumberDoc.data();
        console.log("Data from cardNumbers:", cardNumberData);
      } else {
        console.log("cardNumbers data doesnt exist");
      }
      // *Sing in the user after account creation, and redirect after 2s.
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUid(user.uid);
          console.log(user.uid);
          successToast("Loged in Successfully.");
          setTimeout(() => {
            setLoading(false);
            navigate("/inside");
          }, 2000);
        })
        .catch((error: any) => {
          const { code, message } = error;
          console.error(code, message);
          console.log(error);
          errorToast("Something went wrong");
          setUid("");
        });
    } catch (error: any) {
      const { code, message } = error;
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setErrorEmailMessage("Email Already In Use!");
        console.log(errorEmailMessage);
      }
      console.log(error);
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        console.error(code, message);
        setErrorEmailMessage("Invalid E-mail!");
        console.log(errorEmailMessage);
      }
      if (error.message === "Firebase: Error (auth/missing-email).") {
        console.error(code, message);
        setErrorEmailMessage("Please insert E-mail.");
        console.log(errorEmailMessage);
      }
      if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        console.error(code, message);
        setErrorPasswordMessage("Password should be at least 6 characters.");
        console.log(errorEmailMessage);
      }
      if (error) {
        console.log(error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="#033860" sx={{ width: "100%", height: "100vh" }}>
        <CustomContainer>
          <Typography variant="h4">Please enter your credentials.</Typography>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Paper
              elevation={20}
              sx={{
                padding: "10px",
                width: "40%",
                marginTop: "5%",
              }}
            >
              <Form>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <GenderRadio
                    value1="Male"
                    value2="Female"
                    onGenderChange={handleGenderChange}
                  />
                  <Field
                    as={TextField}
                    required
                    name="FirstName"
                    type="text"
                    label="First Name"
                    sx={{ margin: "10px" }}
                  />
                  <Field
                    as={TextField}
                    required
                    name="LastName"
                    type="text"
                    label="Last Name"
                    sx={{ margin: "10px" }}
                  />
                  <Field
                    as={TextField}
                    onClick={() => setErrorEmailMessage(null)}
                    required
                    name="email"
                    type="email"
                    label="E-mail"
                    helperText={errorEmailMessage ? `${errorEmailMessage}` : ""}
                    sx={{
                      margin: "10px",
                      "& input": {
                        backgroundColor: "lightcoral !important",
                        WebkitBoxShadow: errorEmailMessage
                          ? "0 0 0 30px rgba(245, 156, 144, 0.9) inset !important"
                          : "0 0 0 30px white inset !important",
                        WebkitTextFillColor: "black !important",
                      },
                    }}
                    FormHelperTextProps={{
                      sx: {
                        color: "#EF5350",
                      },
                    }}
                  />
                  <Field
                    as={TextField}
                    onClick={() => setErrorPasswordMessage(null)}
                    required
                    name="password"
                    type="password"
                    label="E-Password"
                    sx={{
                      margin: "10px",
                      "& input": {
                        backgroundColor: "lightcoral !important", // background color for input when selecting autocomplete
                        WebkitBoxShadow: errorPasswordMessage
                          ? "0 0 0 30px rgba(245, 156, 144, 0.9) inset !important"
                          : "0 0 0 30px white inset !important", // override autofill box-shadow
                        WebkitTextFillColor: "black !important", // override autofill text color
                      },
                    }}
                    helperText={
                      errorPasswordMessage ? `${errorPasswordMessage}` : ""
                    }
                  />
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
              </Form>
            </Paper>
          </Formik>
          <Typography sx={{ marginTop: "5%" }} variant="h5">
            I already have an account.
          </Typography>
          <Button
            onClick={() => navigate("/inside")}
            sx={{ width: "40%", height: "55px", marginTop: "10px" }}
            variant="contained"
          >
            LOG IN
          </Button>
          <LeaveBankBtn text="LEAVE THE BANK" onClick={() => navigate("/")} />
        </CustomContainer>
        <ToastContainer />
      </Box>
    </ThemeProvider>
  );
};

export default CreateAccount;
