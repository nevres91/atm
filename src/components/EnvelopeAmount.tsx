import { Box, FormHelperText, TextField } from "@mui/material";
import { alignItems } from "../styles/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { useCardContext } from "../context/CardContext";
import InputAdornment from "@mui/material/InputAdornment";
import { useEffect } from "react";

const EnvelopeAmount = ({
  setIsClicked,
  setLoading,
}: {
  isClicked: boolean;
  setIsClicked: any;
  loading: boolean;
  setLoading: any;
}) => {
  const { setDepositAmount, setIsEnvelopeFlashing, isEnvelopeFlashing } =
    useCardContext();

  const initialValues = {
    Amount: "",
  };

  useEffect(() => {
    setDepositAmount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnvelopeFlashing]);

  const onSubmit = async (values: any, { resetForm }: any) => {
    setIsEnvelopeFlashing(false);
    setLoading(true);
    const { Amount } = values;
    const validAmounts = [10, 20, 50, 100, 200];
    if (!validAmounts.includes(Number(Amount))) {
      console.error(
        "Invalid money amount. Only 10, 20, 50, 100, and 200 are acceptable."
      );
      return;
    }
    setTimeout(() => {
      setDepositAmount(parseInt(Amount));
      setIsEnvelopeFlashing(false);
      setIsClicked(false);
      resetForm();
      setLoading(false);
    }, 2500);
  };

  // send an error if anything else except 3 numbers is entered.
  const validationSchema = Yup.object().shape({
    Amount: Yup.number()
      .required("Please Insert Your Money.")
      .oneOf([10, 20, 50, 100, 200])
      .typeError("Only Valid Bills Acceptable!"),
  });

  // Limit Input to only 3 numbers.
  const handleInput = (e: any) => {
    let inputValue = e.target.value.replace(/[^0-9]/g, "");
    inputValue = inputValue.slice(0, 3);
    e.target.value = inputValue;
  };

  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: "99999",
        bottom: "100px",
      }}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values }) => {
          return (
            <Form>
              <Field
                as={TextField}
                autoComplete="off"
                name="Amount"
                id="standard-helperText"
                variant="standard"
                helperText={"Enter Money Amount"}
                type="tel"
                autoFocus={true}
                color="primary"
                required={true}
                onInput={handleInput}
                value={values.Amount}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <span
                        style={{
                          color: "gray",
                          textAlign: "right",
                          fontWeight: "900",
                          fontSize: "30px",
                        }}
                      >
                        $
                      </span>
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  style: {
                    letterSpacing: "10px",
                    textAlign: "center",
                    fontWeight: "900",
                    fontSize: "30px",
                    padding: "5px",
                    Width: "100px",
                  },
                  inputMode: "numeric",
                  min: 0,
                  max: 999,
                  pattern: "[0-9]*",
                }}
                sx={{
                  maxWidth: "60%",
                  background: "white", // change color
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
                  position: "absolute",
                  bottom: "-45px",
                  right: "20%",
                  width: "60%",
                }}
              >
                <ErrorMessage name="Amount" />
              </FormHelperText>
              <ToastContainer />
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default EnvelopeAmount;
