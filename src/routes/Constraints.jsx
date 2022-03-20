import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { NavigationButtons, CardShow, RouteTitle } from "../components";
import { useTranslation } from "react-i18next";

import offgrid from "../assets/offgrid.png";
import ongrid from "../assets/ongrid.png";
import icon from "../assets/gridSolar.png";

const Constraints = () => {
  const { t } = useTranslation();
  const goToNext = useSelector((state) => state.progress.mode);
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="space-around"
      rowSpacing={2}
      sx={{ minHeight: "90vh", marginTop: "1rem" }}
    >
      <Grid item>
        <RouteTitle icon={icon} title={t("type.title")} />
      </Grid>
      <Grid item>
        <CardShow
          image={ongrid}
          typeId="on-grid"
          type={t("type.on_grid")}
          text={t("type.on_grid_content")}
        />
      </Grid>
      <Grid item>
        <CardShow
          image={offgrid}
          typeId="off-grid"
          type={t("type.off_grid")}
          text={t("type.off_grid_content")}
        />
      </Grid>
      <Grid item sx={{ width: "100%", marginInline: "auto" }}>
        <NavigationButtons
          nextPage="results"
          prevPage="PowerConsumption"
          goToNext={goToNext}
        />
      </Grid>
    </Grid>
  );
};

export default Constraints;
