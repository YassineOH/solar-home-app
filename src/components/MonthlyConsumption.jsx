import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import myStyles from "../components/style";

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

import { monthlyConsumptionActions, progressAction } from "../app/store";

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
  june: { value: 0, enable: false },
  july: { value: 0, enable: false },
  august: { value: 0, enable: false },
  september: { value: 0, enable: false },
  october: { value: 0, enable: false },
  november: { value: 0, enable: false },
  december: { value: 0, enable: false },
};

const MonthlyConsumption = () => {
  const { t } = useTranslation();
  const theme = createTheme(useSelector((state) => state.mode.mode));
  const style = myStyles(theme);
  const [open, setOpen] = useState(false);
  const [consumption, setConsumption] = useState(defautlConsumption);
  const dispatch = useDispatch();
  const typeOfData = useSelector(
    (state) => state.monthlyConsumption.typeOfData
  );

  const handleChecking = (e) => {
    let month = months[Number(e.target.id)];
    let newConsumption = { ...consumption };
    newConsumption[month].enable = !newConsumption[month].enable;
    setConsumption(newConsumption);
  };

  const handleValue = (e) => {
    let month = e.target.id;
    let newConsumption = { ...consumption };
    newConsumption[month].value = e.target.value;
    if (month === "january") {
      months.map((month) => {
        if (!newConsumption[month].enable) {
          newConsumption[month].value = Number(e.target.value);
        }
      });
    }
    setConsumption(newConsumption);
  };

  useEffect(() => {
    let data = months.map((month) => Number(consumption[month].value));
    dispatch(monthlyConsumptionActions.setMonthlyConsumption(data));
  }, [consumption]);

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        sx={style.secondaryButton(typeOfData === "exact")}
        variant="contained"
        disabled={typeOfData === "exact" ? false : true}
      >
        {t("exactPower.button")}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t("exactPower.title")}</DialogTitle>

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
                <Typography variant="subtitle1">
                  {t(`exactPower.month_${i + 1}`)}
                </Typography>
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
                <Typography variant="subtitle1">
                  {t("exactPower.unit")}{" "}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={style.secondaryButton(
              consumption["january"].value !== 0 ? true : false
            )}
            onClick={(e) => {
              handleSubmit(e);
              dispatch(progressAction.setProgressPower(true));
            }}
            disabled={consumption["january"].value !== 0 ? false : true}
          >
            {t("exactPower.submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MonthlyConsumption;
