import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import cardImg from "../img/card4.png";
import chip from "../img/chip.png";
import { MyIcon } from "../styles/styles";

const BankCard = ({
  userName,
  cardNumber,
}: {
  userName: string;
  cardNumber: string;
}) => {
  return (
    <Card
      sx={{
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
  );
};

export default BankCard;
