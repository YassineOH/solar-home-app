import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import GoogleMapReact from "google-map-react";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { useSelector, useDispatch } from "react-redux";

import { NavigationButtons } from "../components";
import { coordsActions } from "../store";

const GeoPosition = () => {
  const [showMarker, setShowMarker] = useState(false);
  const [isMapChanged, setIsMapChanged] = useState(false);
  const coords = useSelector((state) => state.coords.coords);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setIsMapChanged(true);
    dispatch(coordsActions.changeCoords({ lat: e.lat, lng: e.lng }));
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
        <Grid item align="center" sx={{ marginTop: "1rem" }}>
          <Typography variant="h4">set the localistaion</Typography>
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
              <RoomOutlinedIcon
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
            onClick={() =>
              alert(`your position is ${(coords.lat + ",", coords.lng)}`)
            }
          >
            set your geo position
          </Button>
        </Grid>
        <Grid item xs={9}>
          <NavigationButtons nextPage="PowerConsumption" prevPage="" />
        </Grid>
      </Grid>
    </>
  );
};

export default GeoPosition;
