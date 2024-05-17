import { useState, useEffect } from "react";
import "./App.css";
import Header from "./header";
import { Pagination_page } from "./pagination";

function App() {
  const [value, setValue] = useState("movie");
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState([]);
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total_pages, setTotal_pages] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=fef55a6754f2f6d00a0038388915039c&include_adult=false&query=${value}&page=${index}`
    )
      .then((r) => r.json())
      .then((result) => {
        setMovies(result.results);
        const length = result.total_pages < 6 ? result.total_pages : 6;
        setTotal_pages(result.total_pages);
        setPages(Array.from({ length: length }, (v, x) => x + 1));
        setLoading(false);
      });
  }, [value, index]);
  useEffect(() => {
    setIndex(1);
  }, [value]);
  const onSubmit = (e) => {
    e.preventDefault();
    setValue(e.target[0].value);
  };
  return (
    <>
      <Header />
      <div className="container App  ">
        <form onSubmit={onSubmit} action="" className="my-4 row ">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name of movie"
            />
            <button
              className="btn btn-outline-primary"
              type="submit"
              id="button-addon2"
            >
              Submit
            </button>
          </div>
        </form>

        <div className=" posters  ">
          {movies.length == 0 || loading == true ? (
            <div className="loadingio-spinner-ripple-nq4q5u6dq7r">
              <div className="ldio-x2uulkbinbj">
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            movies.map((movie) => {
              return (
                <div key={movie.id} className="movie-article">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
                        : "https://tse3.mm.bing.net/th?id=OIP.focxdosXfLcVMbGpnwmbHQAAAA&pid=Api&P=0&h=180"
                    }
                    className=""
                    alt=""
                  />
                  <div className="poster-body">
                    <h5>{movie.name}</h5>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {!loading && (
          <ul className="pagination d-flex justify-content-center">
            {
              <Pagination_page
                index={index}
                setIndex={setIndex}
                TotalPage={total_pages}
                pages={pages}
              />
            }
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
