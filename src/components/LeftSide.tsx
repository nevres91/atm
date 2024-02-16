import React from "react";
import { Box, Card, CardActions, CardMedia, Typography } from "@mui/material";
import { alignItems } from "../styles/styles";
import Keypad from "./Keypad";
import enter from "../img/enter.jpeg";
import { useNavigate } from "react-router-dom";

const LeftSide = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "rgb(145,146,140)",
        width: "100%",
        ...alignItems,
      }}
    >
      <Card
        onClick={() => navigate("/inside")}
        sx={{
          transition: "box-shadow 0.2s",
          height: "350px",
          width: "200px",
          border: "3px solid black",
          backgroundColor: "#e8e8c6",
          ":hover": {
            boxShadow: "0px 20px 20px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
          },
        }}
      >
        <CardMedia sx={{ height: "300px", width: "200px" }} image={enter} />
        <CardActions
          sx={{
            ...alignItems,
            backgroundColor: "#e8e8c6",
          }}
        >
          <Typography sx={{ fontWeight: "900" }}>ENTER THE BANK</Typography>
        </CardActions>
      </Card>

      <Keypad />
    </Box>
  );
};

export default LeftSide;
