import React from "react";
import { Paper, Grid, Radio, FormControlLabel } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import {
  EstimatedPowerConsumption,
  MonthlyConsumption,
  NavigationButtons,
  RouteTitle,
} from "../components/index";

import myStyles from "../components/style";

import { monthlyConsumptionActions } from "../app/store";

import icon from "../assets/counter.png";

const PowerConsumption = () => {
  const style = myStyles();

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
      alignItems="stretch"
      justifyContent="space-evenly"
      sx={{ height: "90vh" }}
      rowSpacing={5}
    >
      <Grid item>
        <RouteTitle title="power consumption" icon={icon}></RouteTitle>
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
            label="Make an estimation on your consumption."
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
            label="Set your exact consumption."
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
