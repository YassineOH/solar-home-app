import React, { useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import GoogleMapReact from "google-map-react";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";

import { NavigationButtons } from "../components";

const GeoPosition = () => {
  const [markerCoords, setMarkerCoords] = useState(null);
  const coords = { lat: 33.9716, lng: -6.8498 };
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
            defaultCenter={coords}
            onClick={(e) => setMarkerCoords({ lat: e.lat, lng: e.lng })}
          >
            {markerCoords && (
              <RoomOutlinedIcon
                fontSize="large"
                lat={markerCoords.lat}
                lng={markerCoords.lng}
              />
            )}
          </GoogleMapReact>
        </Grid>
        <Grid item container justifyContent="center">
          <Button
            variant="contained"
            disabled={markerCoords ? false : true}
            onClick={() =>
              alert(
                `your position is ${(markerCoords.lat + ",", markerCoords.lng)}`
              )
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
