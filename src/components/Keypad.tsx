import { Button, Grid } from "@mui/material";

const buttonStyle = (fSize = "40px", bgColor = "#c8c8c8") => ({
  display: "flex",
  background: bgColor,
  width: "100%",
  height: "100%",
  boxShadow: "inset -5px -5px 3px #3f3f3f, inset 5px 5px 3px #fdfdfd",
  borderRadius: "5px",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontSize: fSize,
  fontWeight: "900",
  color: "black",
  padding: "0",
});

const Keypad = () => {
  return (
    <Grid
      sx={{ width: "50vh", height: "40vh", marginTop: "10px" }}
      container
      spacing={1}
    >
      <Grid item xs={2.7}>
        <Button sx={buttonStyle()}>1</Button>
      </Grid>
      <Grid item xs={2.7}>
        <Button sx={buttonStyle()}>2</Button>
      </Grid>
      <Grid item xs={2.7}>
        <Button sx={buttonStyle()}>3</Button>
      </Grid>
      <Grid item xs={3.9}>
        <Button sx={buttonStyle("20px", "#f54b67")}>CANCEL</Button>
      </Grid>
      <Grid item xs={2.7}>
        <Button sx={buttonStyle()}>4</Button>
      </Grid>
      <Grid item xs={2.7}>
        <Button sx={buttonStyle()}>5</Button>
      </Grid>
      <Grid item xs={2.7}>
        <Button sx={buttonStyle()}>6</Button>
      </Grid>
      <Grid item xs={3.9}>
        <Button sx={buttonStyle("20px", "#f2ff60")}>CLEAR</Button>
      </Grid>
      <Grid item xs={2.7}>
        <Button sx={buttonStyle()}>7</Button>
      </Grid>
      <Grid item xs={2.7}>
        <Button sx={buttonStyle()}>8</Button>
      </Grid>
      <Grid item xs={2.7}>
        <Button sx={buttonStyle()}>9</Button>
      </Grid>
      <Grid item xs={3.9}>
        <Button sx={buttonStyle("20px", "#4db052")}>ENTER</Button>
      </Grid>
      <Grid item xs={2.7}>
        <Button sx={buttonStyle()}></Button>
      </Grid>
      <Grid item xs={2.7}>
        <Button sx={buttonStyle()}>0</Button>
      </Grid>
      <Grid item xs={2.7}>
        <Button sx={buttonStyle()}></Button>
      </Grid>
      <Grid item xs={3.9}>
        <Button sx={buttonStyle()}></Button>
      </Grid>
    </Grid>
  );
};

export default Keypad;
