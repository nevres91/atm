import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Pin = () => {
  let [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      console.log(value);
      setInputValue(value);
    }
  };

  return (
    <Box>
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
            console.log("submited");
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
    </Box>
  );
};

export default Pin;
