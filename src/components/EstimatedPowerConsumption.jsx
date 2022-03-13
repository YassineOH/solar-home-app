import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  FormControl,
  InputLabel,
  FormControlLabel,
  Select,
  MenuItem,
  Checkbox,
  TextField,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

import { monthlyConsumptionActions, progressAction } from "../app/store";

const EstimatedPowerConsumption = () => {
  const [numOfPeople, setNumOfPeople] = useState("");
  const [isBoiler, setIsBoiler] = useState(false);
  const [boiler, setBoiler] = useState("");
  const dispatch = useDispatch();

  const typeOfData = useSelector(
    (state) => state.monthlyConsumption.typeOfData
  );

  const handleNumOfPoeple = (e) => {
    setNumOfPeople(Number(e.target.value));
  };

  const handleBoiler = (e) => {
    if (e.target.checked) {
      setIsBoiler(true);
    } else {
      setIsBoiler(false);
    }
  };

  useEffect(() => {
    if (typeOfData !== "estimated") {
      setNumOfPeople("");
      setIsBoiler(false);
    }
  }, [typeOfData]);

  useEffect(() => {
    let coefMonth = [0.8, 0.9, 0.95, 1, 1.1, 1.17, 1.2, 1.1, 1, 0.95, 0.9, 0.8];
    let coefBoiler = [1, 1, 0.5, 0, 0, 0, 0, 0, 0, 0.4, 0.9, 1];
    let data = Array(12)
      .fill(0)
      .map((_, ind) => {
        return (
          (1500 / 12) * numOfPeople * coefMonth[ind] +
          Number(boiler) * coefBoiler[ind] * 5 * 10
        );
      });
    if (numOfPeople >= 1) {
      dispatch(monthlyConsumptionActions.setMonthlyConsumption(data));
      dispatch(progressAction.setProgressPower(true));
    }
  }, [numOfPeople, boiler]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      columnSpacing={0}
      rowSpacing={3}
    >
      <Grid item sx={{ width: "200px" }}>
        <FormControl fullWidth>
          <InputLabel id="number-of-inhabitants-label">
            number of inhabitants
          </InputLabel>
          <Select
            labelId="number-of-inhabitants-label"
            id="number-of-inhabitants"
            value={numOfPeople}
            label="number of inhabitants"
            onChange={handleNumOfPoeple}
            disabled={typeOfData === "estimated" ? false : true}
          >
            {Array(12)
              .fill(null)
              .map((_, i) => {
                return (
                  <MenuItem key={i} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item container justifyContent="center" alignItems="center">
        {numOfPeople >= 1 &&
          Array(Number(numOfPeople))
            .fill(1)
            .map((_, i) => (
              <Grid item xs={2} key={i}>
                <PersonIcon
                  color="primary"
                  sx={{ display: "block", marginInline: "auto" }}
                />
              </Grid>
            ))}
      </Grid>
      <Grid
        item
        container
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <FormControlLabel
            checked={isBoiler}
            control={<Checkbox />}
            label="include a domestic boiler"
            onChange={handleBoiler}
            disabled={typeOfData === "estimated" ? false : true}
          />
        </Grid>
        <Grid item sx={{ width: "200px" }}>
          <TextField
            id="outlined-number"
            fullWidth
            label="consumption kW"
            type="number"
            disabled={isBoiler ? false : true}
            value={boiler}
            onChange={(e) => setBoiler(e.target.value)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EstimatedPowerConsumption;
