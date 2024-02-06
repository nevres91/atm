import React from "react";
import "./App.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Typography,
} from "@mui/material";
import bg from "./img/bg.jpeg";
import enter from "./img/enter.jpeg";
import receipt from "./img/receipt2.png";
import card from "./img/card2.png";
import envelope from "./img/envelope2.png";
import money from "./img/money2.png";
import Keypad from "./components/Keypad";

const alignItems = {
  justifyContent: " center",
  alignItems: "center",
  textAlign: "center",
};

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        background: "rgb(145,146,140)",
        height: "100vh",
        maxHeight: "100vh",
        justifyContent: "center",
        // overflow: "hidden",
      }}
    >
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
          sx={{ height: "350px", width: "200px", border: "3px solid black" }}
        >
          <CardMedia sx={{ height: "300px", width: "200px" }} image={enter} />
          <CardActions
            sx={{
              ...alignItems,
            }}
          >
            <Typography sx={{ fontWeight: "900" }}>ENTER THE BANK</Typography>
          </CardActions>
        </Card>

        <Keypad />
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "85vh",
            width: "85vh",
            minWidth: "90vh",
            backgroundColor: "red",
            margin: "auto",
            marginTop: "0",
            background: `url(${bg}) no-repeat center center/cover`,
            textAlign: "center",
          }}
        >
          <Typography color={"#d3d3d3"} my={5} mx={4} variant="h3">
            INTERNATIONAL BANK
          </Typography>
        </Box>
        <Box
          sx={{
            height: "15vh",
            ...alignItems,
          }}
        >
          <Button
            sx={{
              height: "95%",
              width: "83%",
              background: `url(${money}) no-repeat center center/cover`,
            }}
          />
        </Box>
      </Box>
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
        <Button
          sx={{
            borderRadius: "10px",
            // boxShadow: "0px 0px 17px 6px rgba(21,255,0,0.75)",
            marginTop: "3%",
            height: "24vh",
            width: "30vh",
            background: `url(${receipt}) no-repeat center center/cover`,
          }}
        />
        <Button
          sx={{
            borderRadius: "10px",
            // boxShadow: "0px 0px 17px 6px rgba(246,72,101,0.75)",
            marginTop: "12%",
            height: "38vh",
            width: "30vh",
            background: `url(${card}) no-repeat center center/cover`,
          }}
        />
        <Button
          sx={{
            borderRadius: "10px",
            // boxShadow: "0px 0px 17px 6px rgba(21,255,0,0.75)",
            marginTop: "10%",
            height: "20vh",
            width: "30vh",
            background: `url(${envelope}) no-repeat center center/cover`,
          }}
        />
      </Box>
    </Box>
  );
}

export default App;
