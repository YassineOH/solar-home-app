import React, { useState } from "react";
import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  FormControlLabel,
  Select,
  MenuItem,
  Checkbox,
  TextField,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

const EstimatedPowerConsumption = () => {
  const [numOfPeople, setNumOfPeople] = useState("");
  const [isBoiler, setIsBoiler] = useState(false);
  const [boiler, setBoiler] = useState(0);

  const handleNumOfPoeple = (e) => {
    setNumOfPeople(e.target.value);
  };

  const handleBoiler = (e) => {
    if (e.target.checked) {
      setIsBoiler(true);
    } else {
      setIsBoiler(false);
    }
  };

  const handleSubmit = () => {};

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      columnSpacing={0}
      rowSpacing={4}
    >
      <Grid item></Grid>
      <Grid item sx={{ width: "100%" }}>
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
                  fontSize="large"
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
            control={<Checkbox />}
            label="incluce a domestic boiler"
            onChange={handleBoiler}
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-number"
            label="consumption kW"
            type="number"
            disabled={isBoiler ? false : true}
            value={boiler}
            onChange={(e) => e.target.value}
          />
        </Grid>
        <Grid item>
          <Button onClick={handleSubmit} variant="contained">
            submit your consumption
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EstimatedPowerConsumption;
