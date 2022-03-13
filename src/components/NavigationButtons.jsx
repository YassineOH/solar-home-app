import React from "react";
import { Button, Grid } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";

const NavigationButtons = ({ nextPage, prevPage, goToNext }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "90%" }}
    >
      <Grid item xs={2}>
        <Button
          variant="outlined"
          component={Link}
          to={`/${prevPage}`}
          startIcon={<ChevronLeftIcon />}
        >
          Prev
        </Button>
      </Grid>
      <Grid item xs={7} />
      <Grid item xs={2}>
        <Button
          variant="outlined"
          component={Link}
          to={`/${nextPage}`}
          disabled={!goToNext ? true : false}
          endIcon={<ChevronRightIcon />}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default NavigationButtons;
