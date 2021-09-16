import "./styles.scss";

import React, { useState, useEffect, useContext } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Menu from "@material-ui/core/Menu";
import FormGroup from "@material-ui/core/FormGroup";
import AppStateContext from "./appState";
import { observer } from "mobx-react";

import PageCounter from "./PageCounter";

//Menu that pops up to filter down the news sources from select source button
const NewsMenu = () => {
  const appState = useContext(AppStateContext);
  //keeps track of what items are being checked off to filter
  const [MenuChecks, SetMenuChecks] = useState(appState.MenuChecks);
  //this function does the actual filtering of news artcicles and updates everything accordly
  const HandleSelectNewsChange = async (event) => {
    SetMenuChecks({ ...MenuChecks, [event.target.name]: event.target.checked });
    var FilteredArr = [];
    appState.setCurrentPage(1);
    if (event.target.checked === false) {
      FilteredArr = appState.TotalNewsArticles.filter((NewArticle) => {
        if (event.target.name !== NewArticle.provider[0].name) {
          return NewArticle;
        }
      });

      appState.SetNewsArticles(FilteredArr.slice(0, 9));
      appState.UpdateTotalPageCount(FilteredArr.length);
      appState.SetTotalNewsArticles(FilteredArr);
    } else if (event.target.checked === true) {
      FilteredArr = window.OrginalTotalNewsArticles.filter((NewArticle) => {
        if (event.target.name === NewArticle.provider[0].name) {
          return NewArticle;
        }
      });

      await appState.SetTotalNewsArticles([
        ...FilteredArr,
        ...appState.TotalNewsArticles
      ]);
      appState.UpdateTotalPageCount(appState.TotalNewsArticles.length);
      await appState.SetNewsArticles(appState.TotalNewsArticles.slice(0, 9));
    }
  };

  return (
    <Menu
      classes={{ paper: "MenuPosition" }}
      anchorEl={appState.OpenNewsMenu}
      keepMounted
      open={Boolean(appState.OpenNewsMenu)}
      onClose={() => appState.SetOpenNewsMenu(false)}
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
  );
};

export default observer(NewsMenu);
