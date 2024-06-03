import "../App.css";
import { Box, Button, CircularProgress } from "@mui/material";
import receipt from "../img/receipt2.png";
import card from "../img/card2.png";
import envelope from "../img/envelope2.png";
import { alignItems } from "../styles/styles";
import CardNumber from "./CardNumber";
import { useInsertCard } from "../hooks/useInsertCard";
import { useCardContext } from "../context/CardContext";
import { useEffect, useState } from "react";
import EnvelopeAmount from "./EnvelopeAmount";

const RightSide = () => {
  const { cardIn, insertCard } = useInsertCard();
  const [envelopeClicked, setEnvelopeClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    isCardValid,
    setIsCardValid,
    isEnvelopeFlashing,
    setIsEnvelopeFlashing,
    isReceiptFlashing,
    setIsReceiptFlashing,
    isReceiptClicked,
    setIsReceiptClicked,
  } = useCardContext();
  const insert = () => {
    insertCard();
    setIsCardValid(false);
    setIsReceiptClicked(false);
  };
  useEffect(() => {
    setIsEnvelopeFlashing(false);
    setIsReceiptFlashing(false);
    setIsReceiptClicked(false);
    if (!isEnvelopeFlashing) {
      setEnvelopeClicked(false);
    }
  }, [cardIn]);
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "rgb(145,146,140)",
        width: "100%",
        ...alignItems,
      }}
    >
      <Button
        onClick={() => {
          setIsReceiptFlashing(false);
          setIsReceiptClicked(true);
        }}
        sx={{
          borderRadius: "10px",
          marginTop: "3%",
          height: "24vh",
          width: "30vh",
          disabled: isReceiptFlashing ? "false" : "true",
          background: `url(${receipt}) no-repeat center center/cover`,
          animation: isReceiptFlashing ? "flash-receipt 2s infinite" : "none",
          "@keyframes flash-receipt": {
            "0%, 49.9%, 100%": {
              boxShadow: "0 0 17px 6px rgba(21,255,0,0.75)",
            },
            "50%, 99.9%": {
              boxShadow: "none",
            },
          },
        }}
      />
      {cardIn ? <CardNumber /> : ""}
      <Button
        onClick={insert}
        sx={{
          borderRadius: "10px",
          marginTop: "12%",
          height: "38vh",
          width: "30vh",
          background: `url(${card}) no-repeat center center/cover`,
          boxShadow:
            cardIn && !isCardValid
              ? "0 0 17px 6px orange"
              : cardIn && isCardValid
              ? "0 0 17px 6px rgba(21,255,0,0.75)"
              : "none",
          animation:
            !cardIn || isReceiptClicked ? "flash-card 2s infinite" : "none",
          "@keyframes flash-card": {
            "0%, 49.9%, 100%": {
              boxShadow: "0 0 17px 6px rgba(21,255,0,0.75)",
            },
            "50%, 99.9%": {
              boxShadow: "none",
            },
          },
        }}
      />
      {loading ? (
        <CircularProgress
          size={60}
          color="error"
          sx={{ position: "absolute", zIndex: "99999", bottom: "10%" }}
        />
      ) : envelopeClicked && isEnvelopeFlashing && !loading ? (
        <EnvelopeAmount
          isClicked={envelopeClicked}
          setIsClicked={setEnvelopeClicked}
          loading={loading}
          setLoading={setLoading}
        />
      ) : envelopeClicked && !isEnvelopeFlashing ? (
        ""
      ) : (
        ""
      )}
      <Button
        onClick={() => {
          setEnvelopeClicked(!envelopeClicked);
        }}
        disabled={isEnvelopeFlashing ? false : true}
        sx={{
          borderRadius: "10px",
          marginTop: "10%",
          height: "20vh",
          width: "30vh",
          background: `url(${envelope}) no-repeat center center/cover`,
          boxShadow:
            envelopeClicked && isEnvelopeFlashing && !loading
              ? "0 0 17px 6px rgba(242, 125, 22,1)"
              : loading
              ? "0 0 17px 6px red"
              : "none",
          animation:
            isEnvelopeFlashing && !envelopeClicked
              ? "flash-envelope 2s infinite"
              : isEnvelopeFlashing && envelopeClicked
              ? "none"
              : "none",
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
  );
};

export default RightSide;
