import {
  Box,
  Typography,
  Paper,
  Button,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";
import {
  CustomContainer,
  FormField,
  GenderRadio,
  LeaveBankBtn,
  theme,
} from "../styles/styles";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
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
    const auth = getAuth(app);
    const db = getFirestore(app);
    const cardNumber = generateUniqueNumber();
    const pinNumber = generateUniquePinNumber();
    const { email, password, FirstName, LastName } = values; //values comes from Formik

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
          setLoading(true);
          setUid(user.uid);
          console.log(user.uid);
          successToast("Loged in Successfully.");
          setTimeout(() => {
            setLoading(false);
            navigate("/inside");
          }, 2000);
        })
        .catch((error: any) => {
          const { errorCode, errorMessage } = error;
          console.error(errorCode, errorMessage);
          errorToast("Something went wrong");
          setUid("");
        });
    } catch (error: any) {
      const { errorCode, errorMessage } = error;
      if (errorCode || errorMessage) {
        console.error(errorCode, errorMessage);
        alert(errorMessage);
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

                  <FormField
                    id="1"
                    name="FirstName"
                    type="text"
                    label="First Name"
                  />
                  <FormField
                    id="3"
                    name="LastName"
                    type="text"
                    label="Last Name"
                  />
                  <FormField id="2" name="email" type="email" label="E-mail" />
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
