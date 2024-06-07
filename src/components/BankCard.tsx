import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import cardImg from "../img/card4.png";
import chip from "../img/chip.png";
import { MyIcon } from "../styles/styles";
import { useEffect, useState } from "react";
import { getPin } from "../functions/customFunctions";
import { Box } from "@mui/material";

const BankCard = ({
  userName,
  cardNumber,
}: {
  userName: string;
  cardNumber: string;
}) => {
  const [backSide, setBackSide] = useState(false);
  const [pin, setPin] = useState<null | string>(null);
  useEffect(() => {
    const fetchPin = async () => {
      if (cardNumber) {
        const pin = await getPin(cardNumber);
        if (pin) {
          setPin(pin);
        }
      }
    };
    fetchPin();
  }, [pin, cardNumber]);
  return (
    <>
      {backSide ? (
        <Card
          onClick={() => setBackSide(!backSide)}
          sx={{
            caretColor: "transparent",
            cursor: "pointer",
            position: "relative",
            minWidth: "550px",
            maxWidth: "550px",
            minHeight: "315px",
            background:
              "linear-gradient( -72.3deg,  rgba(29,7,64,1) 8.5%, rgba(253,105,139,1) 92.2% )",
            borderRadius: "18px",
            boxShadow: "0px 0px 17px 6px rgba(0,0,0,0.75)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "left",
              fontSize: "12px",
              rowGap: "2px",
              margin: "5px 0 0 20px",
              color: "silver",
            }}
          >
            Lorem ipsum dolor sit amet: 0 700 500 333
          </Typography>
          <Typography
            sx={{
              background: "rgb(17, 17, 17)",
              height: "60px",
              width: "100%",
              marginTop: "1%",
            }}
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
                marginTop: "10%",
              }}
            >
              <Typography mx={3} sx={{ color: "silver" }}>
                PIN:
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  letterSpacing: "10px",
                  background: "white",
                  borderRadius: "5px",
                  height: "40px",
                  width: "35%",
                }}
              >
                {pin}
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontSize: "12px",
                rowGap: "2px",
                margin: "15px 0 0 20px",
                color: "silver",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              assumenda ad sequi cupiditate omnis id libero accusantium
              praesentium est fuga!
            </Typography>
            <Typography
              variant="h6"
              sx={{
                position: "absolute",
                bottom: "5px",
                right: "20px",
                fontSize: "12px",
                rowGap: "2px",
                color: "silver",
              }}
            >
              www.bank.com
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card
          onClick={() => setBackSide(!backSide)}
          sx={{
            caretColor: "transparent",
            cursor: "pointer",
            position: "relative",
            minWidth: "550px",
            minHeight: "315px",
            background:
              "linear-gradient( 72.3deg,  rgba(29,7,64,1) 8.5%, rgba(253,105,139,1) 92.2% )",
            borderRadius: "18px",
            boxShadow: "0px 0px 17px 6px rgba(0,0,0,0.75)",
          }}
        >
          <MyIcon top="20px" right="20px" img={cardImg} />
          <MyIcon top="35%" left="7%" img={chip} />
          <CardContent>
            <Typography
              sx={{
                position: "absolute",
                top: "20px",
                left: "20px",
                color: "silver",
                textShadow: "5px 0px 2px rgba(0,0,0,0.45)",
              }}
              variant="h4"
              color="text.secondary"
              gutterBottom
            >
              Credit Card
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                top: "58%",
                left: "40px",
                letterSpacing: "20px",
                color: "silver",
                textShadow: "6px 0px 2px rgba(0,0,0,0.45)",
              }}
              variant="h3"
              component="div"
            >
              {cardNumber}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                position: "absolute",
                bottom: "20px",
                left: "40px",
                color: "silver",
                textShadow: "6px 0px 2px rgba(0,0,0,0.45)",
              }}
            >
              {userName}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BankCard;
