import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { ChooseLgGrid } from "../styles/styles";

const ChoseLg = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Typography variant="h4">Please select yout Language:</Typography>
      <Grid sx={{ width: "100%", height: "80%" }} container spacing={3} my={3}>
        <ChooseLgGrid label="Bosanski" />
        <ChooseLgGrid label="Deutsch" />
        <ChooseLgGrid label="Slovenščina" />
        <ChooseLgGrid label="English" />
      </Grid>
    </Box>
  );
};

export default ChoseLg;
