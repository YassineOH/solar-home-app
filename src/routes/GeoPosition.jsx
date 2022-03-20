import React, { useState, useEffect } from "react";
import { Grid, Button, Avatar } from "@mui/material";
import { createTheme } from "@mui/system";
import GoogleMapReact from "google-map-react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { getSolarPower } from "../services/solarData";

import myStyles from "../components/style";
import { NavigationButtons, RouteTitle } from "../components";
import {
  coordsActions,
  progressAction,
  specificEnergyActions,
} from "../app/store";

import { darkMapStyle } from "../components/style";
import icon from "../assets/map.png";
import pin from "../assets/pin.png";

const GeoPosition = () => {
  const { t } = useTranslation();
  const [showMarker, setShowMarker] = useState(false);
  const [isMapChanged, setIsMapChanged] = useState(false);
  const coords = useSelector((state) => state.coords.coords);
  const goToNext = useSelector((state) => state.progress.geoPosition);
  const dispatch = useDispatch();
  const theme = createTheme(useSelector((state) => state.mode.mode));

  const style = myStyles(theme);

  const handleChange = (e) => {
    setIsMapChanged(true);
    dispatch(coordsActions.changeCoords({ lat: e.lat, lng: e.lng }));
  };

  const handleSubmit = () => {
    getSolarPower("PVcalc", coords.lat, coords.lng, 1)
      .then((res) => JSON.parse(res.data.contents))
      .then((data) => data.outputs.totals.fixed.E_y)
      .then((energy) => {
        dispatch(specificEnergyActions.setSpecificEnergy(energy));
      });
    dispatch(progressAction.setProgressGeo(true));
  };

  useEffect(() => {
    if (isMapChanged) {
      setShowMarker(true);
    }
  }, [isMapChanged]);

  return (
    <>
      <Grid
        container
        rowSpacing={5}
        alignItems="stretch"
        justifyContent="space-around"
        direction="column"
        sx={{
          width: `min(100vw, 550px)`,
          marginInline: "auto",
          overflowX: "hidden",
        }}
      >
        <Grid item align="center">
          <RouteTitle title={t("localisation.title")} icon={icon} />
        </Grid>
        <Grid
          item
          style={{
            height: "60vh",
            paddingTop: 0,
          }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAPS_KEYS }}
            defaultZoom={10}
            defaultCenter={{ lat: 33.9716, lng: -6.8498 }}
            onClick={(e) => handleChange(e)}
            options={() => {
              if (theme.palette.mode === "dark") {
                return { disableDefaultUI: true, styles: darkMapStyle };
              } else {
                return { disableDefaultUI: true, styles: [] };
              }
            }}
          >
            {showMarker && (
              <Avatar
                src={pin}
                sx={style.pin}
                fontSize="large"
                lat={coords.lat}
                lng={coords.lng}
              />
            )}
          </GoogleMapReact>
        </Grid>
        <Grid item container justifyContent="center">
          <Button
            variant="contained"
            disabled={showMarker ? false : true}
            sx={style.secondaryButton(showMarker)}
            onClick={handleSubmit}
          >
            {t("localisation.set_localisation")}
          </Button>
        </Grid>
        <Grid item>
          <NavigationButtons
            nextPage="PowerConsumption"
            prevPage=""
            goToNext={goToNext}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default GeoPosition;
