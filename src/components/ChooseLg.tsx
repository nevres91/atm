import { Box, Grid, Typography } from "@mui/material";
import { ChooseLgGrid } from "../styles/styles";
import { useTranslation } from "react-i18next";

interface Languages {
  en: { nativeName: string };
  de: { nativeName: string };
  slo: { nativeName: string };
  bih: { nativeName: string };
}

const lngs: Languages = {
  en: { nativeName: "English" },
  de: { nativeName: "Deutsch" },
  slo: { nativeName: "Slovenščina" },
  bih: { nativeName: "Bosanski" },
};
const ChoseLg = ({
  setService,
  setLoading,
}: {
  setService: React.Dispatch<React.SetStateAction<null | string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t, i18n } = useTranslation();

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Typography variant="h4">Please select yout Language:</Typography>
      <Grid sx={{ width: "100%", height: "80%" }} container spacing={3} my={3}>
        {Object.keys(lngs).map((lng) => (
          <ChooseLgGrid
            key={lng}
            label={lngs[lng as keyof Languages].nativeName}
            onClick={() => {
              i18n.changeLanguage(lng);
              setService("");
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 1500);
            }}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default ChoseLg;
