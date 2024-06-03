import "../App.css";
import { Box, Button, Typography } from "@mui/material";
import bg from "../img/bg.jpeg";
import money from "../img/money2.png";
import { alignItems } from "../styles/styles";
import Pin from "./Pin";
import { useCardContext } from "../context/CardContext";
import { usePinContext } from "../context/PinContext";
import ServicesMenu from "./ServicesMenu";
import { useEffect } from "react";
import { getConfiscateStatus } from "../functions/customFunctions";

const Middle = () => {
  const {
    isCardValid,
    currentCard,
    isConfiscated,
    setIsConfiscated,
    isMoneyFlashing,
    setIsMoneyFlashing,
    setIsReceiptFlashing,
    setReceiptType,
  } = useCardContext();
  const { isPinValid } = usePinContext();
  useEffect(() => {
    if (currentCard.length > 1) {
      const getStatus = async () => {
        const confStatus = await getConfiscateStatus(currentCard);
        setIsConfiscated(confStatus);
      };
      getStatus();
    }
  }, [currentCard]);

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
          my={0}
          sx={{
            display: "flex",
            ...alignItems,
            height: "100%", // changed to 100 from 60
          }}
        >
          {!isCardValid ? (
            <Typography sx={{}} variant="h4">
              WELCOME <br />
              <br />
              Please insert your card.
            </Typography>
          ) : isPinValid ? (
            <ServicesMenu />
          ) : isCardValid && isConfiscated ? (
            <Typography sx={{}} variant="h4">
              CONFISCATED!! <br />
              <br />
              Your card is confiscated, please talk to our employee.
            </Typography>
          ) : (
            <Pin />
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
          disabled={isMoneyFlashing ? false : true}
          onClick={() => {
            setIsMoneyFlashing(false);
            setIsReceiptFlashing(true);
            setReceiptType("withdraw");
          }}
          sx={{
            height: "95%",
            width: "83%",
            background: `url(${money}) no-repeat center center/cover`,
            animation: isMoneyFlashing ? "flash-envelope 2s infinite" : "none",
            "@keyframes flash-envelope": {
              "0%, 49.9%, 100%": {
                boxShadow: "0 0 17px 6px rgba(21,255,0,0.75)", // ! changes color of card also
              },
              "50%, 99.9%": {
                boxShadow: "none",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Middle;
