import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import { alignItems } from "../styles/styles";
import { fetchAccounts } from "../functions/customFunctions";
import useFetchAccounts from "../hooks/useFetchAccounts";

const AccountsList = () => {
  function generate(element: any) {
    return [0, 1, 2, 3, 4, 5, 6].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  // const fetchUsers = async () => {
  //   const users = await fetchAccounts();
  //   console.log(users);
  // };
  // fetchUsers();
  const users = useFetchAccounts();

  return (
    <Grid
      my={5}
      sx={{
        position: "relative",
        ...alignItems,
        overflow: "hidden",
      }}
      container
      spacing={2}
    >
      <Grid item xs={12} md={6} sx={{ height: "100%", overflow: "scroll" }}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
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
