import React, { useState } from "react";
import {
  Grid,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  Typography,
} from "@mui/material";

const months = [
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
];

const defautlConsumption = {
  january: { value: 0, enable: true },
  february: { value: 0, enable: false },
  march: { value: 0, enable: false },
  april: { value: 0, enable: false },
  may: { value: 0, enable: false },
  may: { value: 0, enable: false },
  june: { value: 0, enable: false },
  july: { value: 0, enable: false },
  august: { value: 0, enable: false },
  september: { value: 0, enable: false },
  october: { value: 0, enable: false },
  november: { value: 0, enable: false },
  december: { value: 0, enable: false },
};

const MonthlyConsumption = () => {
  const [open, setOpen] = useState(false);
  const [consumption, setConsumption] = useState(defautlConsumption);

  const handleChecking = (e) => {
    let month = months[Number(e.target.id)];
    let newConsumption = { ...consumption };
    consumption[month].enable = !consumption[month].enable;
    setConsumption(newConsumption);
  };

  const handleValue = (e) => {
    let month = e.target.id;
    let newConsumption = { ...consumption };
    newConsumption[month].value = e.target.value;
    if (month === "january") {
      months.map((month) => {
        if (!newConsumption[month].enable) {
          newConsumption[month].value = e.target.value;
        }
      });
    }
    setConsumption(newConsumption);
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained">
        enter your monthly consumption
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Enter your averge monthly consumption.</DialogTitle>

        <DialogContent>
          {months.map((month, i) => (
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              key={month}
              sx={{ marginBottom: ".2rem" }}
            >
              <Grid item xs={5}>
                <Typography variant="subtitle1">{`${month}`}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  id={`${i}`}
                  checked={consumption[month].enable ? true : false}
                  onChange={handleChecking}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  type="number"
                  id={month}
                  disabled={consumption[month].enable ? false : true}
                  value={consumption[month].value}
                  onChange={handleValue}
                />
              </Grid>
              <Grid item xs={1}>
                <Typography variant="subtitle1">kWh</Typography>
              </Grid>
            </Grid>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={consumption["january"].value !== 0 ? false : true}
          >
            Submit your consumption
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MonthlyConsumption;
