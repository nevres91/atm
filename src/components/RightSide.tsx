import "../App.css";
import { Box, Button } from "@mui/material";
import receipt from "../img/receipt2.png";
import card from "../img/card2.png";
import envelope from "../img/envelope2.png";
import { alignItems } from "../styles/styles";
import CardNumber from "./CardNumber";

const RightSide = ({ insertCard }: { insertCard: () => void }) => {
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
        sx={{
          borderRadius: "10px",
          // boxShadow: "0px 0px 17px 6px rgba(21,255,0,0.75)",
          marginTop: "3%",
          height: "24vh",
          width: "30vh",
          background: `url(${receipt}) no-repeat center center/cover`,
        }}
      />
      <CardNumber />
      <Button
        onClick={insertCard}
        sx={{
          borderRadius: "10px",
          // boxShadow: "0px 0px 17px 6px rgba(246,72,101,0.75)",
          marginTop: "12%",
          height: "38vh",
          width: "30vh",
          background: `url(${card}) no-repeat center center/cover`,
          animation: "flash 2s infinite",
          "@keyframes flash": {
            "0%, 49.9%, 100%": {
              boxShadow: "0 0 17px 6px rgba(21,255,0,0.75)",
            },
            "50%, 99.9%": {
              boxShadow: "none",
            },
          },
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
  );
};

export default RightSide;