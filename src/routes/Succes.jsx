import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Succes = () => {
  const { t } = useTranslation();
  return (
    <>
      <Grid
        container
        sx={{ height: "80vh" }}
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item sx={{ marginBottom: "2rem" }}>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", width: "80%", marginInline: "auto" }}
            gutterBottom
          >
            {t("succes")}
          </Typography>
        </Grid>
        <Grid item>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="contained" fullWidth>
              {t("result.redo")}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default Succes;
