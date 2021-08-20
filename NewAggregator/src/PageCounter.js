import "./styles.scss";
import React, { useState, useEffect, useContext } from "react";
import Pagination from "@material-ui/lab/Pagination";
import AppStateContext from "./appState";
import { observer } from "mobx-react";

//this component contains the page counter that enables you to
//switch pages
//rerenders the pages new articles as the user changes pages
const PageCounter = () => {
  const appState = useContext(AppStateContext);
  const [PageFade, SetPageFade] = useState(true);
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

    if (page === appState.PageCount) {
      End = appState.TotalNewsArticles.length;
    }
    appState.setCurrentPage(page);
    await appState.SetPageFade(false);
    await appState.SetNewsArticles(
      appState.TotalNewsArticles.slice(Start, End)
    );
    await appState.SetPageFade(true);
    var element = document.getElementById("root");
    element.scrollTop = element.scrollHeight;
  };

  return (
    <Pagination
      page={appState.CurrentPage}
      onChange={(event, page) => RenderPageCount(event, page)}
      classes={{ ul: "PageNumber" }}
      color="primary"
      count={appState.PageCount}
      variant="outlined"
      shape="rounded"
    />
  );
};

export default observer(PageCounter);
