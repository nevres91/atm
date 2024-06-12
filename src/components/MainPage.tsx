import { Box } from "@mui/material";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Middle from "./Middle";
import { useState } from "react";
import { PinContext } from "../context/PinContext";

const MainPage = () => {
  const [isPinValid, setIsPinValid] = useState(false);
  return (
    <PinContext.Provider value={{ isPinValid, setIsPinValid }}>
      <Box
        sx={{
          display: "flex",
          background: "rgb(145,146,140)",
          height: "100vh",
          maxHeight: "100vh",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <LeftSide />
        <Middle />
        <RightSide />
      </Box>
    </PinContext.Provider>
  );
};

export default MainPage;
