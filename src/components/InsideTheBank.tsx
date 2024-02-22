import { Box, Container, Grid, Typography } from "@mui/material";
import { InsideMenu } from "../styles/styles";
import { alignItems } from "../styles/styles";
import { useNavigate } from "react-router-dom";

const InsideTheBank = () => {
  const navigate = useNavigate();
  return (
    <Box bgcolor="#033860" sx={{ width: "100%", height: "100vh" }}>
      <Container
        sx={{
          paddingTop: "3%",
          backgroundColor: "#004385",
          height: "100vh",
          width: "100vw",
          ...alignItems,
          color: "white",
        }}
        maxWidth="xl"
      >
        <Typography variant="h4">
          Hello customer, what would you like to do?
          <Grid container my={4} spacing={2}>
            <InsideMenu width={6} label="Return the card" />
            <InsideMenu
              onClick={() => navigate("/inside/create")}
              width={6}
              label="Create an account"
            />
            <InsideMenu width={6} label="Link accounts" />
            <InsideMenu width={6} label="Register as an employee" />
            <InsideMenu width={6} label="Empty the atm" />
            <InsideMenu width={6} label="Quit the job" />
            <InsideMenu
              onClick={() => navigate("/")}
              width={12}
              label="Leave the bank"
            />
          </Grid>
        </Typography>
      </Container>
    </Box>
  );
};

export default InsideTheBank;
