import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { ChooseLgGrid } from "../styles/styles";
import { getBalance } from "../functions/customFunctions";
import { useCardContext } from "../context/CardContext";

const ServicesMenu = () => {
  const { currentCard } = useCardContext();
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Typography variant="h4">Please select a transaction:</Typography>
      <Grid sx={{ width: "100%", height: "80%" }} container spacing={0} my={15}>
        <ChooseLgGrid label="Cash WIthdrawal" />
        <ChooseLgGrid label="Deposit" />
        <ChooseLgGrid label="Transfer" />
        <ChooseLgGrid
          onClick={async () => await getBalance(currentCard)}
          label="Balance"
        />
      </Grid>
    </Box>
  );
};

export default ServicesMenu;
