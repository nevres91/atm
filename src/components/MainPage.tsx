import React from "react";
import { Box } from "@mui/material";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Middle from "./Middle";
import { useInsertCard } from "../hooks/useInsertCard";

const MainPage = () => {
  const { cardIn, insertCard } = useInsertCard();
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
      <LeftSide />
      <Middle cardIn={cardIn} />
      <RightSide insertCard={insertCard} />
    </Box>
  );
};

export default MainPage;
