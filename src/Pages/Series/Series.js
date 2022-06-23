import axios from "axios";
import { useEffect, useState } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchSeries = async () => {
    const targetPage = Math.floor(page * (30 / 20));
    const res1 = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=03b3a926963fde7555559b94d498e309&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${targetPage}`
    );
    const res2 = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=03b3a926963fde7555559b94d498e309&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${
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
    setNumOfPages(res1.data.total_pages);
  };

  useEffect(() => {
    fetchSeries();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">TV Series</span>
      <div className="trending">
        {content &&
          content.map((content) => (
            <SingleContent
              key={content.id}
              id={content.id}
              poster={content.poster_path}
              title={content.title || content.name}
              date={content.first_air_date || content.release_date}
              media_type="tv"
              rating_average={content.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Series;
