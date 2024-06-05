import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useCardContext } from "../context/CardContext";
import {
  fetchUserName,
  getBalance,
  getFirstNameByCardNumber,
  setAccBalance,
  successToast,
} from "../functions/customFunctions";
import Receipt from "./Receipt";
import AccountsList from "./AccountsList";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

const TransferMoneyAtm = ({
  setService,
}: {
  setService: React.Dispatch<React.SetStateAction<null | string>>;
}) => {
  const { t } = useTranslation();
  const {
    currentCard,
    cardBalance,
    setCardBalance,
    isReceiptFlashing,
    setIsReceiptFlashing,
    setReceiptType,
    isReceiptClicked,
    receiptType,
  } = useCardContext();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState<null | string>(null);
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [recipientName, setRecitpientName] = useState<string>("");
  const [amountErorMessage, setAmountErrorMessage] = useState<null | string>(
    null
  );

  useEffect(() => {
    const refreshBalance = async () => {
      if (currentCard) {
        const cardBalance = await getBalance(currentCard); //! Fetching account balance in addition to status
        if (cardBalance) {
          setCardBalance(cardBalance); //! Setting global state for balance
        }
      }
    };
    refreshBalance();
    fetchUserName(currentCard).then((userName) => {
      if (userName) {
        setUserName(userName);
      } else {
        console.log("userName doesnt exist");
      }
    });
  }, [currentCard, setCardBalance, cardBalance]);

  const initialValues = {
    recipient: "",
    amount: "",
  };

  //!SUBMIT
  const onSubmit = async (values: any, { resetForm }: { resetForm: any }) => {
    let { recipient, amount } = values;
    const parsedAmount = parseInt(amount);
    const balanceAfter = cardBalance - parsedAmount - 1.25; //! Users balance after transfer
    const recBalance = await getBalance(recipient); //! Recipient's balance
    if (!recBalance) {
      setErrorMessage("Recepient doesn't exist!");
      setLoading(false);
      return;
    }
    const recBalanceAfter = recBalance + parsedAmount; //! Recipient's balance after transfer
    setLoading(true);
    try {
      if (parsedAmount <= 0) {
        setAmountErrorMessage("Please enter a valid amount.");
        setLoading(false);
        return;
      }
      if (balanceAfter < 0) {
        setAmountErrorMessage("Balance too low!");
        setLoading(false);
        return;
      }
      if (recipient === currentCard) {
        setErrorMessage("You cannot transfer money to your own Account.");
        setLoading(false);
        return;
      }
      // if (recipient === undefined) {
      //   setLoading(false);
      //   return;
      // }
      const recipientCard = await getFirstNameByCardNumber(recipient);
      const recName = await fetchUserName(recipient);
      if (!recipientCard) {
        setErrorMessage("Recepient doesn't exist!");
        setLoading(false);
        return;
      }
      setTimeout(async () => {
        await setAccBalance(currentCard, balanceAfter); //! Set new balance to user's account
        await setAccBalance(recipient, recBalanceAfter); //! Set new balance to recipient's account
        successToast("Money Transfer Successful.");
        setCardBalance(balanceAfter); //! Setting user's new balance to update UI
        setIsReceiptFlashing(true);
        setReceiptType("transfer");
        setTransferAmount(parsedAmount);
        if (recName) {
          setRecitpientName(recName);
        }
        resetForm();
        setDate(new Date().toLocaleString());
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.log("Error:" + error);
    }
  };

  //!Reset Error Messages
  const resetErrorMessage = () => {
    setAmountErrorMessage("");
    setErrorMessage("");
  };

  // Limit Input to only 6 numbers.
  const handleInput = (e: any) => {
    let inputValue = e.target.value.replace(/[^0-9]/g, "");
    inputValue = inputValue.slice(0, 6);
    e.target.value = inputValue;
    e.preventDefault();
  };

  return (
    <>
      {isReceiptClicked && receiptType === "transfer" ? (
        <Receipt
          date={date}
          cardNumber={currentCard}
          userName={userName}
          transferAmount={transferAmount}
          finalBalance={cardBalance}
          recipientName={recipientName}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              background: "rgba(104, 126, 163, 0.9)",
              padding: "10px",
              textAlign: "left",
            }}
            variant="h4"
          >
            {t("description.part3")}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={() => setService(null)}
              disabled={isReceiptFlashing ? true : false}
              sx={{
                margin: "5px 0 0 5px",
                minHeight: "30px",
                width: "20%",
              }}
              variant="contained"
            >
              {t("description.part9")}
            </Button>
            <Typography
              my={1}
              sx={{
                marginTop: "1%",
                color: "white",
                textAlign: "right",
                marginRight: "20px",
              }}
              variant="h5"
            >
              {t("description.part4")}: {cardBalance}
            </Typography>
          </Box>
          <Typography my={4} variant="h5">
            {isReceiptFlashing
              ? t("description.part12")
              : t("description.part20")}
          </Typography>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Field //!RECIPIENT
                  as={TextField}
                  name="recipient"
                  type="tel"
                  label={t("description.part19")}
                  variant="filled"
                  required
                  disabled={isReceiptFlashing ? true : false}
                  onInput={handleInput}
                  onClick={resetErrorMessage}
                  helperText={errorMessage ? `${errorMessage}` : ""}
                  InputProps={{
                    style: {
                      letterSpacing: "15px",
                      fontWeight: "900",
                      fontSize: "20px",
                      padding: "5px",
                      width: "300px",
                      background: errorMessage
                        ? "rgba(255, 184, 184, 1)"
                        : "rgba(241, 242, 237, 0.5)",
                      borderRadius: "10px 10px 0 0",
                    },
                  }}
                  FormHelperTextProps={{
                    sx: {
                      color: "#EF5350",
                      marginLeft: "0",
                    },
                  }}
                  inputProps={{
                    style: {
                      color: "rgba(47, 72, 148, 0.9)",
                      textAlign: "center",
                      fontWeight: "900",
                      fontSize: "25px",
                      letterSpacing: "15px",
                      padding: "15px 0 15px 0",
                    },
                  }}
                  style={{ margin: "2px auto" }}
                ></Field>
                <Field //!AMOUNT
                  as={TextField}
                  name="amount"
                  type="tel"
                  label={t("description.part21")}
                  variant="filled"
                  required
                  disabled={isReceiptFlashing ? true : false}
                  onInput={handleInput}
                  onClick={resetErrorMessage}
                  helperText={amountErorMessage ? `${amountErorMessage}` : ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{
                          marginLeft: "-20%",
                        }}
                      >
                        {" "}
                        <span
                          style={{
                            color: "rgba(47, 72, 148, 0.7)",
                            textAlign: "right",
                            fontWeight: "900",
                            fontSize: "30px",
                          }}
                        >
                          $
                        </span>
                      </InputAdornment>
                    ),
                    style: {
                      letterSpacing: "15px",
                      fontWeight: "900",
                      fontSize: "20px",
                      padding: "5px",
                      width: "300px",
                      background: amountErorMessage
                        ? "rgba(255, 184, 184, 1)"
                        : "rgba(241, 242, 237, 0.5)",
                      borderRadius: "0",
                    },
                  }}
                  FormHelperTextProps={{
                    sx: {
                      color: "#EF5350",
                      marginLeft: "0",
                    },
                  }}
                  inputProps={{
                    style: {
                      color: "rgba(47, 72, 148, 0.9)",
                      textAlign: "center",
                      fontWeight: "900",
                      fontSize: "25px",
                      letterSpacing: "15px",
                      padding: "15px 0 15px 0",
                    },
                  }}
                  style={{ margin: "2px auto" }}
                ></Field>
                <Button //!CONFIRM BUTTON
                  type="submit"
                  disabled={isReceiptFlashing ? true : false}
                  sx={{
                    width: "300px",
                    height: "50px",
                    margin: "auto",
                    borderRadius: "0 0 10px 10px",
                    marginTop: "2px",
                  }}
                  variant="contained"
                >
                  {loading ? (
                    <CircularProgress
                      sx={{
                        color: "white",
                      }}
                    />
                  ) : (
                    t("description.part8")
                  )}
                </Button>
              </Box>
            </Form>
          </Formik>
          <Box
            sx={{
              overflow: "scroll",
              height: "42%",
              marginTop: "10px",
            }}
          >
            {isReceiptFlashing ? "" : <AccountsList />}
          </Box>
        </Box>
      )}
    </>
  );
};

export default TransferMoneyAtm;
