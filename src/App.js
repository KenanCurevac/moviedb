import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import { Container } from "@material-ui/core";
import Trending from "./Pages/Trending/Trending";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Search from "./Pages/Search/Search";
import Navigation from "./components/Navigation/Navigation.js";
import Grid from "@material-ui/core/Grid";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Grid container className="pageTop">
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <Navigation />
        </Grid>
        <Grid item xs={12}>
          <div className="app">
            <Container>
              <Switch>
                <Route path="/" component={Trending} exact />
                <Route path="/movies" component={Movies} />
                <Route path="/series" component={Series} />
                <Route path="/search" component={Search} />
              </Switch>
            </Container>
          </div>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
