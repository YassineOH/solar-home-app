import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  Radio,
  FormControlLabel,
} from "@mui/material";

import myStyles from "../components/style";

import { modeOfInstallationActions } from "../app/store";

const CardShow = ({ image, type, text }) => {
  const style = myStyles();
  const mode = useSelector((state) => state.modeOfInstallation.mode);
  const dispatch = useDispatch();
  const handleMode = (e) => {
    dispatch(modeOfInstallationActions.setModeOfInstallation(e.target.value));
  };

  return (
    <Card sx={style.myCard(type === mode)}>
      <Grid container alignItems="center" justifyContent="space-evenly">
        <Grid item xs={2}>
          <CardMedia
            component="img"
            image={image}
            sx={({ objectFit: "contain" }, style.imgFilter(!(type === mode)))}
          />
        </Grid>
        <Grid item xs={9}>
          <CardContent
            sx={({ paddingRight: 0 }, style.textDisable(!(type === mode)))}
          >
            <Typography varaint="h6" sx={{ fontWeight: "bold" }}>
              {type.toUpperCase()} Installation
            </Typography>
            <Typography variant="body">{text}</Typography>
          </CardContent>
        </Grid>
        <Grid item xs={1}>
          <CardActions>
            <FormControlLabel
              checked={type === mode ? true : false}
              value={type}
              control={<Radio />}
              onChange={(e) => handleMode(e)}
              label=""
            />
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardShow;
