import React, { useState, useEffect } from "react";
import { Grid, Button, Avatar } from "@mui/material";
import GoogleMapReact from "google-map-react";
import { useSelector, useDispatch } from "react-redux";

import { getSolarPower } from "../services/solarData";

import myStyles from "../components/style";
import { NavigationButtons, RouteTitle } from "../components";
import {
  coordsActions,
  progressAction,
  specificEnergyActions,
} from "../app/store";

import icon from "../assets/map.png";
import pin from "../assets/pin.png";

const GeoPosition = () => {
  const [showMarker, setShowMarker] = useState(false);
  const [isMapChanged, setIsMapChanged] = useState(false);
  const coords = useSelector((state) => state.coords.coords);
  const goToNext = useSelector((state) => state.progress.geoPosition);
  const dispatch = useDispatch();

  const style = myStyles();

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
        spacing={5}
        alignItems="stretch"
        justifyContent="space-around"
        direction="column"
      >
        <Grid item align="center">
          <RouteTitle title="set the localisation" icon={icon} />
        </Grid>
        <Grid
          item
          style={{
            height: "60vh",
          }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAPS_KEYS }}
            defaultZoom={10}
            defaultCenter={{ lat: 33.9716, lng: -6.8498 }}
            onClick={(e) => handleChange(e)}
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
            set your geo position
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
