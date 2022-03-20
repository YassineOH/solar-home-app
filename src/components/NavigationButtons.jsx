import React from "react";
import { Button, Grid } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import cookies from "js-cookie";

const NavigationButtons = ({ nextPage, prevPage, goToNext }) => {
  const { t } = useTranslation();
  const lang = cookies.get("i18next") || "en";

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={0}
      sx={{
        marginBottom: "1rem",
        width: "min(90vw, 500px)",
        marginInline: "auto",
      }}
    >
      <Grid item>
        <Button
          variant="outlined"
          component={Link}
          to={`/${prevPage}`}
          startIcon={lang === "ar" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        >
          {t("prev_nav")}
        </Button>
      </Grid>

      <Grid item>
        <Button
          variant="outlined"
          component={Link}
          to={`/${nextPage}`}
          disabled={!goToNext ? true : false}
          endIcon={lang === "ar" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        >
          {t("next_nav")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default NavigationButtons;
