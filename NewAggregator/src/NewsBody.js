import "./styles.scss";
import Typography from "@material-ui/core/Typography";
import React, { useState, useEffect, useContext } from "react";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import ScheduleIcon from "@material-ui/icons/Schedule";
import moment from "moment";
import Fade from "react-reveal/Fade";
import AppStateContext from "./appState";
import { observer } from "mobx-react";

//contains the body of the new articles returned from the search
const NewsBody = () => {
  const AppState = useContext(AppStateContext);
  return (
    <Fade when={AppState.PageFade}>
      {AppState.DisplayNewsArticles.map((article) => (
        <Paper elevation={1}>
          <Grid classes={{ container: "JobPostContainer" }} container>
            <Grid classes={{ item: "JobPostitem" }} item xs={2}>
              <Avatar
                classes={{ root: "CompanyProfilePic" }}
                variant="rounded"
                alt="Remy Sharp"
                src={
                  Boolean(article.image === undefined)
                    ? ""
                    : article.image.thumbnail.contentUrl
                }
              />
            </Grid>
            <Grid classes={{ item: "JobPostitem" }} item xs={10}>
              <Typography variant="h6" gutterBottom>
                {article.name}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                {article.description}
              </Typography>

              <div className="ItemEnd">
                <a target="_blank" href={article.url}>
                  <Button variant="outlined" color="primary">
                    View Article
                  </Button>
                </a>

                <div>
                  <Typography
                    classes={{ root: "IconsContainer" }}
                    display="inline"
                    variant="subtitle2"
                    gutterBottom
                  >
                    <PublicOutlinedIcon classes={{ root: "Icon" }} />
                    {article.provider[0].name}
                  </Typography>

                  <Typography
                    classes={{ root: "IconsContainer" }}
                    display="inline"
                    variant="subtitle2"
                    gutterBottom
                  >
                    <ScheduleIcon classes={{ root: "Icon" }} />{" "}
                    {moment().format(article.datePublished).substring(0, 10)}
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Fade>
  );
};

export default observer(NewsBody);
