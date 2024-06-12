import {
  Button,
  Container,
  Grid,
  TextField,
  createTheme,
  ContainerProps,
  Paper,
  Box,
} from "@mui/material";
import { Field } from "formik";
import { useField } from "formik";
import React, { ReactNode } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface InsideMenuProps {
  label: string;
  width: number;
  color?: string;
  disabled?: any;
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

// !A box with blue background
export const MainBox = ({ children }: { children: any }) => {
  return (
    <Box
      bgcolor="#033860"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        ...alignItems,
        // border: "2px solid red",
      }}
    >
      {children}
    </Box>
  );
};

// !An icon with a custom image and absolute position
export const MyIcon = ({
  top,
  right,
  left,
  img,
  bottom,
}: {
  bottom?: string;
  top?: string;
  right?: string;
  left?: string;
  img: string;
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "absolute",
        top: top,
        right: right,
        left: left,
        bottom: bottom,
        background: `url(${img}) no-repeat center center/cover`,
        height: "60px",
        width: "100px",
      }}
    />
  );
};

// ! A button to leave the bank
export const LeaveBankBtn = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <Button
      sx={{
        width: "75%",
        marginTop: "10px",
        height: "10%",
        // position: "absolute",
        // bottom: "20px",
        fontSize: "2rem",
      }}
      onClick={onClick}
      variant="contained"
    >
      {text}
    </Button>
  );
};

// !Gender Form
export const GenderRadio = ({
  value1,
  value2,
  onGenderChange,
}: {
  value1: string;
  value2: string;
  onGenderChange: (gender: string) => void;
}) => {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(e) => onGenderChange(e.target.value)}
        defaultValue={value1}
      >
        <FormControlLabel value={value1} control={<Radio />} label="Male" />
        <FormControlLabel value={value2} control={<Radio />} label="Female" />
      </RadioGroup>
    </FormControl>
  );
};

// !Choose language grid
export const ChooseLgGrid = ({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) => (
  <Grid item xs={6}>
    <Button
      sx={{
        ...lgButton,
      }}
      variant="contained"
      onClick={onClick}
    >
      {label}
    </Button>
  </Grid>
);

// !Iside the bank, services menu items.
export const InsideMenu: React.FC<InsideMenuProps> = ({
  label,
  width,
  color,
  disabled,
  onClick,
}) => (
  <Grid item xs={width} gap={2} onClick={onClick}>
    <Button
      disabled={disabled}
      variant="contained"
      sx={{
        backgroundColor: `${color}`,
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

// !A customized field in a form.
export const FormField = ({
  label,
  type,
  name,
  id,
  value,
  size,
  marginLeft,
  disabled,
  onInput,
  letterSpacing,
  fontSize,
  fontWeight,
  padding,
  textAlign,
  sx = {},
  ...rest
}: {
  label: string;
  type: string;
  name: string;
  id: string;
  value?: number | null;
  size?: string;
  marginLeft?: string;
  disabled?: boolean;
  onInput?: (e: any) => void;
  letterSpacing?: string;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
  textAlign?: string;
  sx?: object;
}) => {
  const [field] = useField(name);

  return (
    <Field
      {...field}
      onInput={onInput}
      as={TextField}
      disabled={disabled}
      name={name}
      id={`outlined-basic ${id}`}
      type={type}
      variant="outlined"
      label={label}
      color="primary"
      required={true}
      value={value}
      size={size}
      sx={{
        background: "white",
        borderRadius: "5px",
        marginTop: "10px",
        marginLeft: marginLeft,
        ...sx,
      }}
      inputProps={{
        style: {
          letterSpacing: letterSpacing,
          fontWeight: fontWeight,
          fontSize: fontSize,
          padding: padding,
          textAlign: textAlign,
        },
      }}
      {...rest}
    />
  );
};

//! Making the textfields full width as default.
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

// !Blue bg container
interface CustomContainerProps extends ContainerProps {
  children: ReactNode;
}
export const CustomContainer: React.FC<CustomContainerProps> = ({
  children,
}) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "3%",
        backgroundColor: "#004385",
        height: "100vh",
        width: "100vw",
        color: "white",
        overflow: "scroll",
      }}
      maxWidth="xl"
    >
      {children}
    </Container>
  );
};
