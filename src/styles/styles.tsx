import { Button, Grid, TextField, createTheme } from "@mui/material";
import { Field } from "formik";
import { useField } from "formik";

interface InsideMenuProps {
  label: string;
  width: number;
  onClick?: () => void;
}

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

export const InsideMenu: React.FC<InsideMenuProps> = ({
  label,
  width,
  onClick,
}) => (
  <Grid item xs={width} gap={2} onClick={onClick}>
    <Button
      variant="contained"
      sx={{
        width: "100%",
        height: "60px",
        fontSize: {
          xs: "16px",
          md: "25px",
        },
      }}
    >
      {label}
    </Button>
  </Grid>
);

export const FormField = ({
  label,
  type,
  name,
  id,
}: {
  label: string;
  type: string;
  name: string;
  id: string;
}) => {
  const [field, meta] = useField(name);

  return (
    <Field
      {...field}
      as={TextField}
      name={name}
      id={`outlined-basic ${id}`}
      type={type}
      variant="outlined"
      label={label}
      color="primary"
      required={true}
      sx={{
        background: "white",
        borderRadius: "5px",
        marginTop: "10px",
        ...alignItems,
      }}
    />
  );
};

// Making the textfields full width as default.
export const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        autoComplete: "true",
      },
    },
  },
});
