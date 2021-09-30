import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HeaderCss from "./Header.module.scss";
import InputBase from "@material-ui/core/InputBase";
import React, { useState, useEffect, useContext } from "react";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import AppStateContext from "./Shared/appState";
import { Link } from 'react-router-dom';

const Header = () => {
  const AppState = useContext(AppStateContext)
  const [SearchTerm, SetSearchTerm] = useState("");
  return (
    <div>
      <Grid container={true} justifyContent="space-between">
        <Grid xs item>
          <div>
            <Link to={"/"}>
            <IconButton>
              <img
                className={HeaderCss.header_HomeIcon}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/502px-Logo_of_YouTube_%282015-2017%29.svg.png"
              />
            </IconButton>
            </Link>
          </div>
        </Grid>
        <Grid xs item>
          <div className={HeaderCss.SearchBar}>
            <InputBase
              endAdornment={
                <div className={HeaderCss.SearchBar_Icon}>
                  <Link to={`/search/${SearchTerm}`}>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                  </Link>
                </div>
              }
              classes={{
                root: HeaderCss.SearchBar_InputRoot,
                input: HeaderCss.SearchBar_Input,
              }}
              value={SearchTerm}
              onChange={(event) => {
                SetSearchTerm(event.target.value);
                AppState.SetSearchTerm(event.target.value)
              }}
              placeholder="Search"
            />
          </div>
        </Grid>

        <Grid xs item />
      </Grid>
      <Divider variant="inset" />
    </div>
  );
};

export default Header;
