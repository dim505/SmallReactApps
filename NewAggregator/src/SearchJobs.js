import "./styles.scss";
import AppStateContext from "./appState";
import InputBase from "@material-ui/core/InputBase";
import React, { useState, useEffect, useContext } from "react";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import Button from "@material-ui/core/Button";

//This component contains the search box for the news keywords
const SearchJobs = () => {
  const [SearchTerm, SetSearchTerm] = useState("");
  const AppState = useContext(AppStateContext);
  return (
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
            AppState.GetNews(SearchTerm);
          }}
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchJobs;
