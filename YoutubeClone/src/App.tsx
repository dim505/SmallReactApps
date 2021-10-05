import React, { useEffect, useState, useContext } from "react";
import Header from "./Components/Header/Header";
import RecommendedVideos from "./Components/RecommendedVideo/RecommendedVideos";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchPageResults from "./Components/SearchPageResults/SearchPageResults.tsx";
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer";
import Grid from "@material-ui/core/Grid";
import "./Global.scss";
import Fade from "@mui/material/Fade";
//root parent that contains all the routes for the app
const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Route exact path="/">
          <Grid container>
            <RecommendedVideos
              Location="home"
              BreakPoints={{ xs: 12, sm: 6, md: 4 }}
            />
          </Grid>
        </Route>
        <Route path="/search/:searchQuery">
          <SearchPageResults />
        </Route>

        <Route path="/video/:videoId">
          <VideoPlayer />
        </Route>
      </Router>
    </>
  );
};

export default App;
