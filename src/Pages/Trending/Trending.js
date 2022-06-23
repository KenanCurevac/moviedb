import axios from "axios";
import { useState, useEffect } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Trending.css";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTrending = async () => {
    const targetPage = Math.floor(page * (30 / 20));
    const res1 = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=03b3a926963fde7555559b94d498e309&page=${targetPage}`
    );
    const res2 = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=03b3a926963fde7555559b94d498e309&page=${
        targetPage + 1
      }`
    );
    let results;
    if (page % 2 === 0) {
      results = [...res1.data.results.slice(10, 20), ...res2.data.results];
    } else {
      results = [...res1.data.results, ...res2.data.results.slice(0, 10)];
    }
    setContent(results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((content) => (
            <SingleContent
              key={content.id}
              id={content.id}
              poster={content.poster_path}
              title={content.title || content.name}
              date={content.first_air_date || content.release_date}
              media_type={content.media_type}
              rating_average={content.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
