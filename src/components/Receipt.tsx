import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useCardContext } from "../context/CardContext";

const Receipt = ({
  cardNumber,
  date,
  userName,
  depositAmount,
  finalBalance,
  withdrawAmount,
  transferAmount,
  recipientName,
}: {
  cardNumber: string;
  date: string | null;
  userName: string;
  depositAmount?: number;
  finalBalance: number;
  withdrawAmount?: number;
  transferAmount?: number;
  recipientName?: string;
}) => {
  const { receiptType } = useCardContext();
  return (
    <Paper
      elevation={20}
      sx={{
        width: "400px",
        margin: "auto",
        padding: "40px 20px",
        height: receiptType === "transfer" ? "95%" : "85%",
      }}
    >
      <Typography
        my={5}
        variant="h6"
        sx={{
          marginTop: "30px",
          borderTop: "3px dotted gray",
          borderBottom: "3px dotted gray",
          padding: "20px",
          color: "gray",
        }}
      >
        ATM TRANSACTION
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          my={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "gray",
          }}
        >
          <Typography>DATE</Typography>
          <Typography>{date}</Typography>
        </Box>
        <Box
          my={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "gray",
          }}
        >
          <Typography>CARD NUMBER</Typography>
          <Typography sx={{ letterSpacing: "8px" }}>{cardNumber}</Typography>
        </Box>
        <Box
          my={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "gray",
          }}
        >
          <Typography>CUSTOMER NAME</Typography>
          <Typography>{userName}</Typography>
        </Box>
        {depositAmount !== undefined ? (
          <Box
            my={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "gray",
            }}
          >
            <Typography>DEPOSIT AMOUNT</Typography>
            <Typography>${depositAmount}</Typography>
          </Box>
        ) : receiptType === "balance" ? (
          ""
        ) : receiptType === "transfer" ? (
          <>
            <Box
              my={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "gray",
              }}
            >
              <Typography>RECEPIENT NAME</Typography>
              <Typography>{recipientName}</Typography>
            </Box>
            <Box
              my={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "gray",
              }}
            >
              <Typography>TRANSFER AMOUNT</Typography>
              <Typography>$ {transferAmount}</Typography>
            </Box>
            <Box
              my={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "gray",
              }}
            >
              <Typography>TERMINAL FEE</Typography>
              <Typography>$ 1.25</Typography>
            </Box>
          </>
        ) : (
          <>
            <Box
              my={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "gray",
              }}
            >
              <Typography>WITHDRAW AMOUNT</Typography>
              <Typography>${withdrawAmount}</Typography>
            </Box>
            <Box
              my={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "gray",
              }}
            >
              <Typography>TERMINAL FEE</Typography>
              <Typography>$1.25</Typography>
            </Box>
          </>
        )}
        <Box
          my={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "gray",
          }}
        >
          <Typography>
            {receiptType === "balance" ? "BALANCE" : "FINAL BALANCE"}
          </Typography>
          <Typography>${finalBalance}</Typography>
        </Box>
        <Typography
          my={2}
          sx={{ borderBottom: "3px dotted gray" }}
        ></Typography>
      </Box>
    </Paper>
  );
};

export default Receipt;
