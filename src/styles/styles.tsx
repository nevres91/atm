import { Button, Grid } from "@mui/material";

export const alignItems = {
  justifyContent: " center",
  alignItems: "center",
  textAlign: "center",
};

export const lgButton = {
  width: "80%",
  height: "80%",
  fontSize: "25px",
};

export const ChooseLgGrid = ({ label }: { label: string }) => (
  <Grid item xs={6}>
    <Button
      sx={{
        ...lgButton,
      }}
      variant="contained"
    >
      {label}
    </Button>
  </Grid>
);
