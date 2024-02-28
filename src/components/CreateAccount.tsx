import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  ThemeProvider,
} from "@mui/material";
import { FormField, theme } from "../styles/styles";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../firebaseConfig";
import app from "../firebaseConfig";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { generateUniqueNumber } from "../functions/customFunctions";
import { generateUniquePinNumber } from "../functions/customFunctions";
import { getFirstNameByCardNumber } from "../functions/customFunctions";

const CreateAccount = () => {
  getFirstNameByCardNumber(425670);
  const navigate = useNavigate();
  const initialValues = {
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    password2: "",
  };

  const onSubmit = async (values: any, props: any) => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const cardNumber = generateUniqueNumber();
    const pinNumber = generateUniquePinNumber();
    const { email, password, FirstName, LastName } = values; //values comes from Formik

    try {
      // Registering a user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);

      // Writting data to user database
      const docRefUsers = await addDoc(collection(db, "users"), {
        firstName: FirstName,
        lastName: LastName,
        cardNumber,
      });
      console.log("Document user written with id:", docRefUsers.id);

      const docRefCardNumber = await setDoc(
        doc(db, "cardNumbers", `${cardNumber}`),
        {
          fullName: `${FirstName} ${LastName}`,
          pin: pinNumber,
        }
      );
      console.log(docRefCardNumber);

      const cardNumberDoc = await getDoc(
        doc(db, "cardNumbers", `${cardNumber}`)
      );
      if (cardNumberDoc.exists()) {
        const cardNumberData = cardNumberDoc.data();
        console.log("Data from cardNumbers:", cardNumberData);
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode || errorMessage) {
        console.log(errorCode);
        console.log(errorMessage);
        alert(errorMessage);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="#033860" sx={{ width: "100%", height: "100vh" }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "3%",
            backgroundColor: "#004385",
            height: "100vh",
            width: "100vw",
            color: "white",
          }}
          maxWidth="xl"
        >
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
                    Submit
                  </Button>
                </Box>
              </Form>
            </Paper>
          </Formik>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CreateAccount;
