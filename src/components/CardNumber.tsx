import { Box, TextField } from "@mui/material";
import { alignItems } from "../styles/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CardNumber = () => {
  const initialValues = {
    cardNumber: "",
  };

  const onSubmit = (values: any, props: any) => console.log(values.cardNumber);

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
                name="cardNumber"
                id="standard-helperText"
                variant="standard"
                helperText="Please enter your card Number"
                type="tel"
                autoFocus={true}
                color="primary"
                required={true}
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    console.log("submited");
                  }
                }}
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
                  background: "white",
                  borderRadius: "5px",
                  margin: "auto",
                  padding: "5px",
                  ...alignItems,
                }}
              />
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default CardNumber;
