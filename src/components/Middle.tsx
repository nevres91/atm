import "../App.css";
import { Box, Button, Typography } from "@mui/material";
import bg from "../img/bg.jpeg";
import money from "../img/money2.png";
import { alignItems } from "../styles/styles";
import Pin from "./Pin";
import ServicesMenu from "./ServicesMenu";

const Middle = ({ cardIn }: { cardIn: boolean }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          height: "85vh",
          width: "85vh",
          minWidth: "90vh",
          backgroundColor: "red",
          margin: "auto",
          marginTop: "0",
          background: `url(${bg}) no-repeat center center/cover`,
          textAlign: "center",
          color: "#d3d3d3",
        }}
      >
        <Typography my={5} mx={4} variant="h3">
          INTERNATIONAL BANK
        </Typography>
        <Box
          my={10}
          sx={{
            display: "flex",
            ...alignItems,
            height: "60%",
          }}
        >
          {!cardIn ? (
            <Typography sx={{}} variant="h4">
              WELCOME <br />
              <br />
              Please insert your card.
            </Typography>
          ) : (
            <ServicesMenu />
          )}
        </Box>
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
  );
};

export default Middle;
