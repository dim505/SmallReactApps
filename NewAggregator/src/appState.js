import { observable, action, computed } from "mobx";

import { createContext } from "react";
import axios from "axios";

//centraol location for app state that other components can easily use
//holds all returned news articles
window.OrginalTotalNewsArticles = [];

var NewSources = 0;
class AppState {
  //keeps track of new sources and whether they are checked off
  @observable MenuChecks = {};
  //shows news articles on current page
  @observable DisplayNewsArticles = [];
  //keeps track of news artcles filtered and unfiltered
  @observable TotalNewsArticles = [];
  //fades news articles as they appear
  @observable PageFade = true;
  //keeps track of page user is on
  @observable CurrentPage = 1;
  //keeps track of total number of pages
  @observable PageCount = 0;
  //determines to open news source menu or not
  @observable OpenNewsMenu = 0;

  //opens select new source muni
  SetOpenNewsMenu = (bool) => {
    this.OpenNewsMenu = bool;
  };
  //sets the current page
  setCurrentPage = (Page) => {
    this.CurrentPage = Page;
  };
  //begins page fade for news artciles
  SetPageFade = (bool) => {
    this.PageFade = bool;
  };
  //sets articles for the page
  SetNewsArticles = (articles) => {
    this.DisplayNewsArticles = articles;
  };

  SetTotalNewsArticles = (articles) => {
    this.TotalNewsArticles = articles;
  };

  //function used to update total pages based on news articles
  UpdateTotalPageCount = (NewLength) => {
    if ((NewLength >= 0) & (NewLength <= 10)) {
      this.PageCount = 1;
    } else if ((NewLength >= 11) & (NewLength <= 20)) {
      this.PageCount = 2;
    } else if ((NewLength >= 21) & (NewLength <= 30)) {
      this.PageCount = 3;
    } else if ((NewLength >= 31) & (NewLength <= 40)) {
      this.PageCount = 4;
    } else if ((NewLength >= 41) & (NewLength <= 50)) {
      this.PageCount = 5;
    } else {
      this.PageCount = 0;
    }

    return this.PageCount;
  };
  //gets the news articles for the requested search term
  GetNews = (SearchTerm) => {
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
        //updates total page count
        this.UpdateTotalPageCount(response.data.value.length);

        //gets all news providers from response
        NewSources = response.data.value.map((article) => {
          return article.provider[0].name;
        });
        NewSources = [...new Set(NewSources)];
        NewSources.sort();
        var NewSourcesDict = {};
        NewSources.map((Source) => {
          NewSourcesDict[Source] = true;
        });
        this.MenuChecks = NewSourcesDict;

        window.OrginalTotalNewsArticles = response.data.value;
        this.TotalNewsArticles = response.data.value;
        this.DisplayNewsArticles = response.data.value.slice(0, 9);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
}

const AppStateContext = createContext(new AppState());
export default AppStateContext;
