import React from "react";
import { createTheme } from "@mui/material";
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

import { modeOfInstallationActions, progressAction } from "../app/store";

const CardShow = ({ image, type, text, typeId }) => {
  const theme = createTheme(useSelector((state) => state.mode.mode));
  const style = myStyles(theme);
  const mode = useSelector((state) => state.modeOfInstallation.mode);
  const dispatch = useDispatch();
  const handleMode = (e) => {
    dispatch(modeOfInstallationActions.setModeOfInstallation(e.target.value));
    dispatch(progressAction.setProgressMode(true));
  };

  return (
    <Card sx={style.myCard(type === mode)}>
      <Grid container alignItems="center" justifyContent="space-evenly">
        <Grid item xs={2}>
          <CardMedia
            component="img"
            image={image}
            sx={style.imgFilter(!(typeId === mode))}
          />
        </Grid>
        <Grid item xs={8}>
          <CardContent
            sx={({ paddingInline: 0 }, style.textDisable(!(typeId === mode)))}
          >
            <Typography varaint="h6" sx={{ fontWeight: "bold" }}>
              {type.toUpperCase()}
            </Typography>
            <Typography variant="body">{text}</Typography>
          </CardContent>
        </Grid>
        <Grid item xs={2}>
          <CardActions>
            <FormControlLabel
              checked={typeId === mode ? true : false}
              value={typeId}
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
