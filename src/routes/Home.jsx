import React from "react";
import {
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { createTheme } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";

import { languageActions } from "../app/store";
import myStyles from "../components/style";

import themingLang from "../app/themes";

import homeImg from "../assets/house.png";

const languages = [
  {
    code: "fr",
    name: "français",
    contry_code: "fr",
  },
  {
    code: "en",
    name: "english",
    contry_code: "us",
  },
  {
    code: "ar",
    name: "العربية",
    contry_code: "ma",
    dir: "rtl",
  },
];

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [language, setLanguage] = React.useState("");
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  const theme = createTheme(useSelector((state) => state.mode.mode));
  const style = myStyles(theme);

  React.useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
  }, [currentLanguage]);

  return (
    <>
      <Grid
        sx={{ width: `min(100vw, 550px)`, marginInline: "auto" }}
        container
        spacing={2}
        direction="column"
        style={{ height: "90vh" }}
        alignItems="center"
        justifyContent="space-around"
      >
        <Grid item>
          <Typography variant="h4" component="h1" align="center">
            {t("home.main_title")}
          </Typography>
        </Grid>
        <Grid item sx={style.imgHome}>
          <img src={homeImg} style={{ width: "100%" }} alt="home" />
        </Grid>
        <Grid item sx={{ width: 300 }}>
          <FormControl fullWidth>
            <InputLabel id="languague-setting-label">
              {t("home.language_menu")}
            </InputLabel>
            <Select
              labelId="languague-setting-label"
              id="languague-setting"
              value={language}
              label={t("home.language_menu")}
              onChange={(e) => {
                setLanguage(e.target.value);
                i18next.changeLanguage(e.target.value);
                dispatch(
                  languageActions.changeLang(themingLang(e.target.value))
                );
              }}
            >
              {languages.map((lang) => (
                <MenuItem
                  key={lang.contry_code}
                  id={lang.code}
                  value={lang.code}
                >
                  <span
                    className={`flag-icon flag-icon-${lang.contry_code}`}
                    style={{ marginInline: ".8rem" }}
                  />
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Button
            component={Link}
            sx={style.mainButton}
            to="/geoposition"
            variant="contained"
          >
            {t("home.start_now")}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
