import "./styles.scss";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import React, { useState, useEffect } from "react";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Pagination from "@material-ui/lab/Pagination";
import moment from "moment";
import Fade from "react-reveal/Fade";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";

var PageCount = 0;
var CurrentPage = 1;
var NewSources = 0;
var OrginalTotalNewsArticles = [];
//https://devchallenges.io/challenges/TtUjDt19eIHxNQ4n5jps
export default function App() {
  const [SearchTerm, SetSearchTerm] = useState("");
  const [DisplayNewsArticles, SetNewsArticles] = useState([]);
  const [TotalNewsArticles, SetTotalNewsArticles] = useState([]);
  const [PageFade, SetPageFade] = useState(true);
  const [OpenNewsMenu, SetOpenNewsMenu] = useState(false);
  const [MenuChecks, SetMenuChecks] = useState({});

  const UpdateTotalPageCount = (NewLength) => {
    if ((NewLength >= 0) & (NewLength <= 10)) {
      PageCount = 1;
    } else if ((NewLength >= 11) & (NewLength <= 20)) {
      PageCount = 2;
    } else if ((NewLength >= 21) & (NewLength <= 30)) {
      PageCount = 3;
    } else if ((NewLength >= 31) & (NewLength <= 40)) {
      PageCount = 4;
    } else if ((NewLength >= 41) & (NewLength <= 50)) {
      PageCount = 5;
    } else {
      PageCount = 0;
    }

    return PageCount;
  };

  const GetNews = () => {
    console.log(SearchTerm);

    const options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news/search",
      params: {
        q: SearchTerm,
        safeSearch: "Off",
        textFormat: "Raw",
        freshness: "Week",
        count: 50,
        sortBy: "Date"
      },
      headers: {
        "x-bingapis-sdk": "true",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        "x-rapidapi-host": "bing-news-search1.p.rapidapi.com"
      }
    };
    console.log(process.env.API_KEY);
    axios
      .request(options)
      .then((response) => {
        UpdateTotalPageCount(response.data.value.length);
        NewSources = response.data.value.map((article) => {
          return article.provider[0].name;
        });
        NewSources = [...new Set(NewSources)];
        NewSources.sort();
        var NewSourcesDict = {};
        NewSources.map((Source) => {
          NewSourcesDict[Source] = true;
        });
        SetMenuChecks(NewSourcesDict);

        OrginalTotalNewsArticles = response.data.value;
        SetTotalNewsArticles(response.data.value);
        SetNewsArticles(response.data.value.slice(0, 9));
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const RenderPageCount = async (event, page) => {
    var Start = 0;
    var End = 0;

    switch (page) {
      case 1:
        Start = 0;
        End = 9;
        break;
      case 2:
        Start = 10;
        End = 19;
        break;
      case 3:
        Start = 20;
        End = 29;
        break;
      case 4:
        Start = 30;
        End = 39;
        break;
      case 5:
        Start = 40;
        End = 49;
        break;
      default:
        console.log("missing page number");
    }

    if (page === PageCount) {
      End = TotalNewsArticles.length;
    }
    CurrentPage = page;
    await SetPageFade(false);
    await SetNewsArticles(TotalNewsArticles.slice(Start, End));
    await SetPageFade(true);
    var element = document.getElementById("root");
    element.scrollTop = element.scrollHeight;
  };

  const HandleSelectNewsChange = async (event) => {
    SetMenuChecks({ ...MenuChecks, [event.target.name]: event.target.checked });
    var FilteredArr = [];
    CurrentPage = 1;
    if (event.target.checked === false) {
      FilteredArr = TotalNewsArticles.filter((NewArticle) => {
        if (event.target.name !== NewArticle.provider[0].name) {
          return NewArticle;
        }
      });

      SetNewsArticles(FilteredArr.slice(0, 9));
      UpdateTotalPageCount(FilteredArr.length);
      SetTotalNewsArticles(FilteredArr);
    } else if (event.target.checked === true) {
      FilteredArr = OrginalTotalNewsArticles.filter((NewArticle) => {
        if (event.target.name === NewArticle.provider[0].name) {
          return NewArticle;
        }
      });

      await SetTotalNewsArticles([...FilteredArr, ...TotalNewsArticles]);
      UpdateTotalPageCount(TotalNewsArticles.length);
      await SetNewsArticles(TotalNewsArticles.slice(0, 9));
    }
  };
  return (
    <div id="bodyContent">
      <Fade big>
        <div id="PageTitle">
          <Typography variant="h5" gutterBottom>
            <b>News </b> Aggrigator
          </Typography>
        </div>

        <div id="SearchParent">
          <div className="SearchBar">
            <InputBase
              startAdornment={
                <WorkOutlineOutlinedIcon classes={{ root: "SearchBarIcon" }} />
              }
              classes={{
                root: "SearchInputBase"
              }}
              value={SearchTerm}
              fullwidth={true}
              onChange={(event) => {
                SetSearchTerm(event.target.value);
              }}
              id="SeachField"
              placeholder="Enter some keywords to begin your search"
              inputProps={{ "aria-label": "search" }}
            />

            <Button
              onClick={() => {
                GetNews();
              }}
              variant="contained"
              color="primary"
            >
              Search
            </Button>
          </div>
        </div>
      </Fade>

      {DisplayNewsArticles.length > 1 ? (
        <Fade>
          <div id="JobBody">
            <Grid container>
              <Grid item sm={12} md={3}>
                <Button
                  onClick={(event) => SetOpenNewsMenu(event.currentTarget)}
                  endIcon={<ExpandMoreIcon />}
                  variant="outlined"
                  color="primary"
                >
                  Select News Source
                </Button>

                <Menu
                  classes={{ paper: "MenuPosition" }}
                  anchorEl={OpenNewsMenu}
                  keepMounted
                  open={Boolean(OpenNewsMenu)}
                  onClose={() => SetOpenNewsMenu(false)}
                >
                  <FormGroup>
                    {Object.keys(MenuChecks).map((Source) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={MenuChecks[Source]}
                              onChange={HandleSelectNewsChange}
                              name={Source}
                            />
                          }
                          label={Source}
                        />
                      );
                    })}
                  </FormGroup>
                </Menu>
              </Grid>

              <Grid item sm={12} md={9}>
                <Fade when={PageFade}>
                  {DisplayNewsArticles.map((article) => (
                    <Paper elevation={1}>
                      <Grid
                        classes={{ container: "JobPostContainer" }}
                        container
                      >
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
                            <a href={article.url}>
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
                                <PublicOutlinedIcon
                                  classes={{ root: "Icon" }}
                                />
                                {article.provider[0].name}
                              </Typography>

                              <Typography
                                classes={{ root: "IconsContainer" }}
                                display="inline"
                                variant="subtitle2"
                                gutterBottom
                              >
                                <ScheduleIcon classes={{ root: "Icon" }} />{" "}
                                {moment()
                                  .format(article.datePublished)
                                  .substring(0, 10)}
                              </Typography>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Fade>
              </Grid>
            </Grid>

            <Pagination
              page={CurrentPage}
              onChange={(event, page) => RenderPageCount(event, page)}
              classes={{ ul: "PageNumber" }}
              color="primary"
              count={PageCount}
              variant="outlined"
              shape="rounded"
            />
          </div>
        </Fade>
      ) : (
        <div />
      )}
    </div>
  );
}
