import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { createTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { getSolarPower } from "../services/solarData";

import { progressAction } from "../app/store";

import {
  RouteTitle,
  WaitingProgess,
  ResultCard,
  FormDialog,
} from "../components/index";
import { Chart as ChartJS } from "chart.js/auto";

import myStyles from "../components/style";

import icon from "../assets/simulate.png";
import prodIcon from "../assets/production.png";
import saveIcon from "../assets/saving.png";
import roiIcon from "../assets/roi.png";
import co2Icon from "../assets/co2.png";

const Results = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = createTheme(useSelector((state) => state.mode.mode));
  const style = myStyles(theme);
  const [monthlyProduction, setMonthlyProduction] = useState([]);
  const [yearlyProduction, setYearlyProduction] = useState(0);
  const [isResultsReady, setIsResultsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const state = useSelector((state) => state);

  const { lat, lng } = state.coords.coords;
  const powerConsumption = state.monthlyConsumption.data;
  const mode = state.modeOfInstallation.mode;
  const specificEnergy = state.specificEnergy.specificEnergy;
  const yearlyConsumption = powerConsumption.reduce((y, m) => y + m, 0);

  const peakPower = (mode) => {
    if (mode === "on-grid") {
      return Math.floor((yearlyConsumption / specificEnergy) * 0.6);
    } else {
      return Math.floor((yearlyConsumption / specificEnergy) * 1.2);
    }
  };

  const roi = (mode) => {
    if (mode === "on-grid") {
      return (10 * 1000 * peakPower(mode)) / (yearlyProduction * 1.14 * 1.59);
    } else {
      return (17 * 1000 * peakPower(mode)) / (yearlyProduction * 1.14 * 1.59);
    }
  };

  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  const handleSim = () => {
    setIsLoading(true);
    let P_peak = peakPower(mode);

    if (P_peak !== 0) {
      getSolarPower("PVcalc", lat, lng, P_peak).then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setTimeout(() => setIsLoading(false), 1500);
          const data = JSON.parse(res.data.contents);
          setYearlyProduction(data.outputs.totals.fixed.E_y);
          setMonthlyProduction(
            data.outputs.monthly.fixed.map((month) => month.E_m)
          );
          setIsResultsReady(true);
        } else {
          return (
            <WaitingProgess
              text="Network Error please check your network or try again later."
              error={true}
            />
          );
        }
      });
    }
  };
  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////

  if (isLoading) {
    return <WaitingProgess text={t("result.fetch")} error={false} />;
  }

  if (isResultsReady) {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "80vh" }}
      >
        <Button
          onClick={() => {
            setShowResults(true);
            setIsResultsReady(false);
          }}
          sx={style.mainButton}
          variant="contained"
        >
          {t("result.show_result")}
        </Button>
      </Grid>
    );
  }
  //
  //
  //
  if (showResults) {
    const configChart = {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [
        {
          label: t("result.label"),
          data: monthlyProduction,
          backgroundColor: ["#ffc107"],
          autoPadding: false,
          borderColor: "#000",
          borderWidth: 1,
          layout: {
            padding: 20,
          },
        },
      ],
    };
    return (
      <Grid
        container
        alignItems="center"
        justifyContent="space-evenly"
        direction="column"
        rowSpacing={5}
      >
        <Grid
          item
          initial={{ opacity: 0.1, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          component={motion.div}
        >
          <RouteTitle title={t("result.title")} icon={icon} />
        </Grid>
        <Grid
          item
          initial={{ opacity: 0.1, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          component={motion.div}
        >
          <ResultCard
            textValue={t("result.production")}
            value={yearlyProduction}
            unit={t("result.production_unit")}
            icon={prodIcon}
          />
        </Grid>
        <Grid
          item
          initial={{ opacity: 0.1, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          component={motion.div}
        >
          <ResultCard
            textValue={t("result.saving")}
            value={Math.ceil(yearlyProduction * 1.14 * 1.59).toFixed(2)}
            unit={t("result.saving_unit")}
            icon={saveIcon}
          />
        </Grid>
        <Grid
          item
          initial={{ opacity: 0.1, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          component={motion.div}
        >
          <ResultCard
            textValue={t("result.roi")}
            value={roi(mode).toFixed(2)}
            unit={t("result.roi_unit")}
            icon={roiIcon}
          />
        </Grid>
        <Grid
          item
          initial={{ opacity: 0.1, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          component={motion.div}
        >
          <ResultCard
            textValue={t("result.co2")}
            value={((yearlyProduction * 0.67) / 1000).toFixed(2)}
            unit={t("result.co2_unit")}
            icon={co2Icon}
          />
        </Grid>
        <Grid
          item
          sx={{ width: `min(90vw, 500px)`, paddingInline: ".4rem" }}
          initial={{ opacity: 0.1, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          component={motion.div}
        >
          <Bar data={configChart} />
        </Grid>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justifyContent="space-around"
          rowSpacing={2}
          sx={{ marginBottom: 5 }}
        >
          <Grid
            item
            sx={{ width: `min(90vw, 500px)` }}
            initial={{ opacity: 0.1, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            component={motion.div}
          >
            <FormDialog />
          </Grid>
          <Grid
            item
            sx={{ width: `min(90vw, 500px)` }}
            initial={{ opacity: 0.1, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            component={motion.div}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch(progressAction.setProgressGeo(false));
                  dispatch(progressAction.setProgressPower(false));
                  dispatch(progressAction.setProgressMode(false));
                }}
                sx={style.secondaryButton(true, "outlined")}
                fullWidth
              >
                {t("result.redo")}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  //
  //
  //
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "80vh" }}
    >
      <Button onClick={handleSim} sx={style.mainButton} variant="contained">
        {t("result.start_simulation")}
      </Button>
    </Grid>
  );
};

export default Results;
