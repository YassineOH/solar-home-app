import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  Button,
  TextField,
  Grid,
  createTheme,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import store from "../app/store";

import myStyles from "./style";

const FormDialog = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const theme = createTheme(useSelector((state) => state.mode.mode));
  const data = useSelector((state) => state);
  const style = myStyles(theme);
  const [open, setOpen] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        fullWidth
        sx={style.secondaryButton}
      >
        {t("quote.ask")}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ marginBottom: "1rem" }}>
          <Typography sx={{ textAlign: "center" }}>
            {t("quote.fill")}
          </Typography>
        </DialogTitle>
        <form
          name="myForm"
          method="post"
          action="/succes"
          id="myForm"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="myForm" />
          <DialogContent sx={{ marginBottom: "2rem" }}>
            <Grid
              container
              direction="column"
              alignItems="strech"
              justifyContent="space-between"
              rowSpacing={4}
              sx={{ width: "100%" }}
            >
              <Grid item>
                <TextField
                  id="fullName"
                  name="fullName"
                  label={t("quote.name")}
                  variant="standard"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  label={t("quote.phone")}
                  variant="standard"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  id="mail"
                  name="mail"
                  label={t("quote.email")}
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <input
            readOnly
            type="text"
            name="data"
            value={JSON.stringify(data)}
            style={{ display: "none" }}
          />
          <DialogActions>
            <Button variant="contained" type="submit">
              {t("quote.submit")}
            </Button>
          </DialogActions>
        </form>

        {showAlert && <Alert severity="info">{t("quote.alert")}</Alert>}
      </Dialog>
    </>
  );
};

export default FormDialog;
