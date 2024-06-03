import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {
  errorToast,
  setConfiscateStatus,
  successToast,
  validatePin,
} from "../functions/customFunctions";
import { usePinContext } from "../context/PinContext";
import { useCardContext } from "../context/CardContext";
import useInputChange from "../hooks/useInputChange";

const Pin = () => {
  const { currentCard, isConfiscated, setIsConfiscated } = useCardContext();
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const { setIsPinValid } = usePinContext();
  const { inputValue, handleInputChange, resetInputValue } = useInputChange();

  const onSubmit = async () => {
    const isPinValid = await validatePin(inputValue);
    if (isPinValid) {
      setIsPinValid(true);
      successToast("Logged in.");
      setWrongAttempts(0);
      resetInputValue();
    } else {
      setWrongAttempts(wrongAttempts + 1);
      if (wrongAttempts >= 2) {
        setConfiscateStatus(currentCard, true);
        setIsConfiscated(true);
        errorToast("Your Card is Confiscated!!!");
        resetInputValue();
      } else {
        errorToast("Wrong PIN number!");
        resetInputValue();
      }
    }
  };

  return (
    <Box>
      {!isConfiscated ? (
        <>
          <Typography variant="h4">Please enter your PIN</Typography>
          <TextField
            id="filled-basic"
            variant="filled"
            value={inputValue}
            onChange={handleInputChange}
            type="password"
            autoFocus={true}
            color="primary"
            required={true}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
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
                width: "150px",
              },
              inputMode: "numeric",
              min: 0,
              max: 9999,
            }}
            sx={{
              marginTop: "30px",
              background: "white",
              borderRadius: "5px 5px 0 0",
            }}
          />
        </>
      ) : (
        <Typography variant="h4">Your card is Confiscated!!!</Typography>
      )}
    </Box>
  );
};

export default Pin;
