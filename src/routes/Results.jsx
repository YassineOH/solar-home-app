import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";

import { getSolarPower } from "../services/solarData";

import { RouteTitle, WaitingProgess, ResultCard } from "../components/index";
import { Chart as ChartJS } from "chart.js/auto";

import myStyles from "../components/style";

import icon from "../assets/simulate.png";
import prodIcon from "../assets/production.png";
import saveIcon from "../assets/saving.png";
import roiIcon from "../assets/roi.png";
import co2Icon from "../assets/co2.png";

const Results = () => {
  const style = myStyles();
  const [monthlyProduction, setMonthlyProduction] = useState([]);
  const [mode, setMode] = useState("PVcalc");
  const [yearlyProduction, setYearlyProduction] = useState(0);
  const [isResultsReady, setIsResultsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const state = useSelector((state) => state);
  const { lat, lng } = state.coords.coords;
  const powerConsumption = state.monthlyConsumption.data;
  const specificEnergy = state.specificEnergy.specificEnergy;
  const yearlyConsumption = powerConsumption.reduce((y, m) => y + m, 0);
  const peakPower = Math.floor(yearlyConsumption / specificEnergy);

  const handleSim = () => {
    setIsLoading(true);
    if (peakPower !== 0) {
      getSolarPower(mode, lat, lng, peakPower).then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          const timer = setTimeout(() => setIsLoading(false), 1500);
          const data = JSON.parse(res.data.contents);
          setYearlyProduction(data.outputs.totals.fixed.E_y);
          setMonthlyProduction(
            data.outputs.monthly.fixed.map((month) => month.E_m)
          );
          setIsResultsReady(true);
        }
      });
    }
  };

  if (isLoading) {
    return <WaitingProgess text="fetching data" />;
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
          show the results
        </Button>
      </Grid>
    );
  }
  //
  //
  //
  if (showResults) {
    const configChart = {
      labels: [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ],
      datasets: [
        {
          label: "chart",
          data: monthlyProduction,
        },
      ],
    };
    return (
      <Grid
        container
        alignItems="center"
        justifyContent="space-evenly"
        direction="column"
        // sx={{ minHeight: "80vh" }}
      >
        <Grid item>
          <RouteTitle title="your results" icon={icon} />
        </Grid>
        <Grid item>
          <ResultCard
            textValue="the yearly solar production"
            value={yearlyProduction}
            unit="kWh"
            icon={prodIcon}
          />
        </Grid>
        <Grid item>
          <ResultCard
            textValue="annual savings (TTC) up to"
            value={Math.ceil(yearlyProduction * 1.14 * 1.59).toFixed(2)}
            unit="MAD"
            icon={saveIcon}
          />
        </Grid>
        <Grid item>
          <ResultCard
            textValue="return on investment less than"
            value={Math.ceil(
              (10 * 1000 * peakPower) / (yearlyProduction * 1.14 * 1.59)
            )}
            unit="yr"
            icon={roiIcon}
          />
        </Grid>
        <Grid item>
          <ResultCard
            textValue="co2 emissions avoided per year"
            value={((yearlyProduction * 0.67) / 1000).toFixed(2)}
            unit="To"
            icon={co2Icon}
          />
        </Grid>
        <Grid item>
          <Bar data={configChart} />
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
        Start the simulation
      </Button>
    </Grid>
  );
};

export default Results;
