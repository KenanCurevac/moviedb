import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import SearchIcon from "@material-ui/icons/Search";
import "./Navigation.css";

function Navigation() {
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  useEffect(() => {
    if (value === 0) history.push("/");
    else if (value === 1) history.push("/movies");
    else if (value === 2) history.push("/series");
    else if (value === 3) history.push("/search");
  }, [value, history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className="nav"
    >
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Trending"
        icon={<TrendingUpIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Movies"
        icon={<LocalMoviesIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Tv Series"
        icon={<LiveTvIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
}
export default Navigation;
