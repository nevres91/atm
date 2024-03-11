import { Box, FormHelperText, TextField } from "@mui/material";
import { alignItems } from "../styles/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  getFirstNameByCardNumber,
  successToast,
  errorToast,
  getConfiscateStatus,
} from "../functions/customFunctions";
import { ToastContainer } from "react-toastify";
import { useCardContext } from "../context/CardContext";
import { usePinContext } from "../context/PinContext";

const CardNumber = () => {
  const { setIsCardValid, setCurrentCard, isCardValid, setIsConfiscated } =
    useCardContext();
  const { setIsPinValid } = usePinContext();
  const initialValues = {
    cardNumber: "",
  };

  const onSubmit = async (values: any, props: any) => {
    setIsPinValid(false);
    const { cardNumber } = values;
    const cardExists = await getFirstNameByCardNumber(cardNumber);
    if (cardExists) {
      successToast("Card Found");
      setIsCardValid(true);
      setCurrentCard(cardNumber);
      const confStatus = await getConfiscateStatus(cardNumber);
      setIsConfiscated(confStatus);
    } else {
      errorToast("Your card is invalid!");
      setIsCardValid(false);
    }
  };

  // send an error if anything else except 6 numbers is entered.
  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .required("Card Number is required")
      .matches(/^[0-9]{6}$/, "Your card must contain 6 numbers"),
  });

  // Limit Input to only 6 numbers.
  const handleInput = (e: any) => {
    let inputValue = e.target.value.replace(/[^0-9]/g, "");
    inputValue = inputValue.slice(0, 6);
    e.target.value = inputValue;
  };

  return (
    <Box sx={{ position: "absolute", zIndex: "99999" }}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props) => {
          // console.log(props);
          return (
            <Form>
              <Field
                as={TextField}
                autoComplete="off"
                name="cardNumber"
                id="standard-helperText"
                variant="standard"
                helperText={"Enter your card Number"}
                type="tel"
                autoFocus={true}
                color="primary"
                required={true}
                onInput={handleInput}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  style: {
                    letterSpacing: "10px",
                    textAlign: "center",
                    fontWeight: "900",
                    fontSize: "30px",
                    padding: "5px",
                    width: "200px",
                  },
                  inputMode: "numeric",
                  min: 0,
                  max: 9999,
                  pattern: "[0-9]*",
                }}
                sx={{
                  background: isCardValid ? "#9ff28f" : "white",
                  borderRadius: "5px",
                  margin: "auto",
                  padding: "5px",
                  ...alignItems,
                }}
              />
              <FormHelperText
                style={{
                  color: "red",
                  background: "#FFCDD2",
                  alignContent: "center",
                  textAlign: "center",
                  borderRadius: "5px",
                }}
              >
                <ErrorMessage name="cardNumber" />
              </FormHelperText>
              <ToastContainer />
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default CardNumber;
