import React from "react";
import { Paper, Grid, Radio, FormControlLabel } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { createTheme } from "@mui/system";

import {
  EstimatedPowerConsumption,
  MonthlyConsumption,
  NavigationButtons,
  RouteTitle,
} from "../components/index";
import { useTranslation } from "react-i18next";

import myStyles from "../components/style";

import { monthlyConsumptionActions } from "../app/store";

import icon from "../assets/counter.png";

const PowerConsumption = () => {
  const { t } = useTranslation();
  const theme = createTheme(useSelector((state) => state.mode.mode));
  const style = myStyles(theme);

  const typeOfData = useSelector(
    (state) => state.monthlyConsumption.typeOfData
  );

  const goToNext = useSelector((state) => state.progress.powerConsumption);

  const dispatch = useDispatch();

  const handleChecked = (e) => {
    if (e.target.value === "estimated") {
      dispatch(monthlyConsumptionActions.setTypeOfData("estimated"));
    } else {
      dispatch(monthlyConsumptionActions.setTypeOfData("exact"));
    }
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="space-evenly"
      sx={{ minHeight: "90vh" }}
      rowSpacing={5}
    >
      <Grid item>
        <RouteTitle title={t("power.title")} icon={icon}></RouteTitle>
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justifyContent="space-around"
        rowSpacing={1}
        component={Paper}
        sx={style.myPaper(typeOfData === "estimated")}
      >
        <Grid item>
          <FormControlLabel
            checked={typeOfData === "estimated"}
            onChange={handleChecked}
            value="estimated"
            control={<Radio />}
            label={t("power.estimation")}
            sx={{ marginInline: 0 }}
          />
        </Grid>
        <Grid item>
          <EstimatedPowerConsumption />
        </Grid>
      </Grid>

      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justifyContent="space-around"
        rowSpacing={1}
        component={Paper}
        sx={style.myPaper(typeOfData === "exact")}
        disabled
      >
        <Grid item>
          <FormControlLabel
            checked={typeOfData === "exact"}
            onChange={handleChecked}
            value="exact"
            control={<Radio />}
            label={t("power.exact")}
            sx={{ marginInline: 0 }}
          />
        </Grid>
        <Grid item>
          <MonthlyConsumption />
        </Grid>
      </Grid>
      <Grid item>
        <NavigationButtons
          nextPage="Constraints"
          prevPage="geoposition"
          goToNext={goToNext}
        />
      </Grid>
    </Grid>
  );
};

export default PowerConsumption;
