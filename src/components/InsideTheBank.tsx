import { Box } from "@mui/material";
import { alignItems } from "../styles/styles";
import LogIn from "./LogIn";

const InsideTheBank = () => {
  return (
    <Box
      bgcolor="#033860"
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        ...alignItems,
      }}
    >
      <LogIn />
    </Box>
  );
};

export default InsideTheBank;
