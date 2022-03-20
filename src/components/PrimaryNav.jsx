import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Avatar,
  Switch,
  Dialog,
  Button,
} from "@mui/material";
import { createTheme } from "@mui/system";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";

import { modeActions } from "../app/store";
import { lightTheme, darkTheme } from "../app/themes";

import myStyles from "../components/style";
import imgLogo from "../assets/sun.png";

const PrimaryNav = () => {
  const { t } = useTranslation();
  const theme = createTheme(useSelector((state) => state.mode.mode));
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(modeActions.setLightTheme(lightTheme));
    } else {
      dispatch(modeActions.setDarkTheme(darkTheme));
    }
  };

  const style = myStyles(theme);
  return (
    <>
      <AppBar sx={style.appBar} color="transparent" position="relative">
        <Toolbar>
          <Grid
            container
            alignItems="center"
            justifyContent="flex-start"
            spacing={2}
          >
            <Grid item xs={2}>
              <Avatar alt="icon" src={imgLogo} />
            </Grid>
            <Grid item xs={7}>
              <Typography
                variant="subtitle2"
                sx={{ textTransform: "uppercase" }}
              >
                Solar app
              </Typography>
            </Grid>
            <Grid
              item
              xs={1}
              sx={{ cursor: "pointer" }}
              onClick={() => setOpen(true)}
            >
              <HelpOutlineRoundedIcon />
            </Grid>
            <Grid item xs={2}>
              <Switch defaultChecked onChange={handleChange} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justifyContent="space-around"
          rowSpacing={1}
          sx={{ width: "100%", padding: "1rem 2rem" }}
        >
          <Grid item>
            <Typography variant="h6">{t("about_app_title")}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              {t("about_app_content")}
            </Typography>
          </Grid>

          <Grid item sx={{ marginTop: "2rem" }}>
            <Typography variant="h6">{t("about_me_title")}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{t("about_me_content")}</Typography>
          </Grid>
          <Grid item>yassine.yas98@gmail.com</Grid>
          <Grid item>
            <Button
              href="https://www.linkedin.com/in/yassine-ofqir-hamma-52b5a7165/"
              target="_blank"
              variant="outlined"
              sx={{ color: "#0A66C2", borderColor: "#0A66C2" }}
            >
              LinkedIN
            </Button>
          </Grid>
        </Grid>
      </Dialog>
      <Outlet />
    </>
  );
};

export default PrimaryNav;
