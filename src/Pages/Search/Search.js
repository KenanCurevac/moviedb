import axios from "axios";
import { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  TextField,
  createMuiTheme,
  Button,
  Tabs,
  Tab,
} from "@material-ui/core";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [entry, setEntry] = useState("");
  const [content, setContent] = useState();
  const [numOfPages, setNumOfPages] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (entry.length < 3) {
      fetchTopRated();
    } else {
      fetchSearch();
    }
  }, [entry, type]);

  const fetchSearch = async () => {
    const targetPage = Math.floor(page * (30 / 20));
    const res1 = await axios.get(
      `https://api.themoviedb.org/3/search/${
        type ? "tv" : "movie"
      }?api_key=03b3a926963fde7555559b94d498e309&language=en-US&query=${entry}&page=${targetPage}&include_adult=false`
    );
    const res2 = await axios.get(
      `https://api.themoviedb.org/3/search/${
        type ? "tv" : "movie"
      }?api_key=03b3a926963fde7555559b94d498e309&language=en-US&query=${entry}&page=${
        targetPage + 1
      }&include_adult=false`
    );
    let results;
    if (page % 2 === 0) {
      results = [...res1.data.results.slice(10, 20), ...res2.data.results];
    } else {
      results = [...res1.data.results, ...res2.data.results.slice(0, 10)];
    }
    console.log(results);
    setContent(results);
    setNumOfPages(res1.data.total_pages);
  };

  const fetchTopRated = async () => {
    setIsLoading(true);
    const targetPage = Math.floor(page * (30 / 20));
    const res1 = await axios.get(
      `https://api.themoviedb.org/3/${
        type ? "tv" : "movie"
      }/top_rated?api_key=03b3a926963fde7555559b94d498e309&language=en-US&page=${targetPage}`
    );
    const res2 = await axios.get(
      `https://api.themoviedb.org/3/${
        type ? "tv" : "movie"
      }/top_rated?api_key=03b3a926963fde7555559b94d498e309&language=en-US&page=${
        targetPage + 1
      }`
    );
    let results;
    if (page % 2 === 0) {
      results = [...res1.data.results.slice(10, 20), ...res2.data.results];
    } else {
      results = [...res1.data.results, ...res2.data.results.slice(0, 10)];
    }
    console.log(results);
    setContent(results);
    setNumOfPages(Math.ceil((res1.data.total_pages * 20) / 30));
    setIsLoading(false);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page]);

  return (
    <div>
      <div style={{ display: "flex", margin: "15px 0" }}>
        <div style={{ position: "relative", flex: 1, width: "100%" }}>
          <TextField
            style={{
              width: "100%",
              marginTop: "-110px",
              background: "#ff6347",
            }}
            color="secondary"
            label="Search"
            variant="filled"
            onChange={(event) => setEntry(event.target.value)}
          />
          {isLoading && (
            <CircularProgress
              style={{
                position: "absolute",
                zIndex: "1000",
                right: "12px",
                bottom: "8px",
              }}
            />
          )}
        </div>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: 10, marginTop: "-110px", height: "60px" }}
          onClick={fetchSearch}
        >
          <SearchIcon />
        </Button>
      </div>
      <Tabs
        value={type}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
        style={{ marginTop: "-70px", paddingBottom: 5, background: "#ff6347" }}
        centered
      >
        <Tab style={{ width: "50%" }} label="Search Movies" />
        <Tab style={{ width: "50%" }} label="Search TV Series" />
      </Tabs>
      <div className="trending" style={{ marginTop: "20px" }}>
        {content &&
          content.map((content) => (
            <SingleContent
              key={content.id}
              id={content.id}
              poster={content.poster_path}
              title={content.title || content.name}
              date={content.first_air_date || content.release_date}
              media_type={type ? "tv" : "movie"}
              rating_average={content.vote_average}
            />
          ))}
        {entry &&
          !content.length &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numofPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
