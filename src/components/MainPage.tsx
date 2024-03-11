import { Box } from "@mui/material";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Middle from "./Middle";
import { useState } from "react";
import { CardContext } from "../context/CardContext";
import { PinContext } from "../context/PinContext";
import { UserContext } from "../context/UserContext";

const MainPage = () => {
  const [isCardValid, setIsCardValid] = useState(false);
  const [isPinValid, setIsPinValid] = useState(false);
  const [currentCard, setCurrentCard] = useState<string>("");
  const [isConfiscated, setIsConfiscated] = useState(false);
  console.log("Main Page Rendered");
  return (
    <CardContext.Provider
      value={{
        isCardValid,
        setIsCardValid,
        currentCard,
        setCurrentCard,
        isConfiscated,
        setIsConfiscated,
      }}
    >
      <PinContext.Provider value={{ isPinValid, setIsPinValid }}>
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
          <Middle />
          <RightSide />
        </Box>
      </PinContext.Provider>
    </CardContext.Provider>
  );
};

export default MainPage;
