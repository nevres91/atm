import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { alignItems } from "../styles/styles";
import useFetchAccounts from "../hooks/useFetchAccounts";

const AccountsList = () => {
  const users = useFetchAccounts();
  return (
    <Grid
      my={1}
      sx={{
        position: "relative",
        ...alignItems,
        overflow: "hidden",
      }}
      container
      spacing={2}
    >
      <Grid item xs={12} md={6} sx={{ height: "100%", overflow: "scroll" }}>
        <Typography
          sx={{ mt: 4, mb: 2, margin: "0" }}
          variant="h6"
          component="div"
        >
          Existing Accounts
        </Typography>
        <Paper
          elevation={12}
          sx={{
            display: "flex",
            ...alignItems,
            background: "rgba(250,250,250,0.7)",
          }}
        >
          <List>
            {users.map((user, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${user.firstName} ${user.lastName}`}
                  secondary={`${user.cardNumber}`}
                  primaryTypographyProps={{
                    textAlign: "center",
                    fontSize: "20px",
                  }}
                  secondaryTypographyProps={{
                    color: "gray",
                    fontSize: "25px",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AccountsList;
