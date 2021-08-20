import "./styles.scss";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import React, { useState, useEffect, useContext } from "react";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Fade from "react-reveal/Fade";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AppStateContext from "./appState";
import SearchJobs from "./SearchJobs";
import { observer } from "mobx-react";
import NewsBody from "./NewsBody";
import NewsMenu from "./NewsMenu";
import PageCounter from "./PageCounter";

//this is the root of the app. App js holds are children elements
function App() {
  const AppState = useContext(AppStateContext);

  return (
    <div id="bodyContent">
      <Fade big>
        <div id="PageTitle">
          <Typography variant="h5" gutterBottom>
            <b>News </b> Aggrigator
          </Typography>
        </div>

        <SearchJobs />
      </Fade>

      {AppState.DisplayNewsArticles.length > 1 ? (
        <Fade>
          <div id="JobBody">
            <Grid container>
              <Grid item sm={12} md={3}>
                <Button
                  onClick={(event) =>
                    AppState.SetOpenNewsMenu(event.currentTarget)
                  }
                  endIcon={<ExpandMoreIcon />}
                  variant="outlined"
                  color="primary"
                >
                  Select News Source
                </Button>

                <NewsMenu />
              </Grid>

              <Grid item sm={12} md={9}>
                <NewsBody />
              </Grid>
            </Grid>
            <PageCounter />
          </div>
        </Fade>
      ) : (
        <div />
      )}
    </div>
  );
}

export default observer(App);
