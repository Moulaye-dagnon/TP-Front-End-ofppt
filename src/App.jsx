import { useState, useEffect } from "react";
import "./App.css";
import Header from "./header";

function App() {
  const [value, setValue] = useState("movie");
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState([]);
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=fef55a6754f2f6d00a0038388915039c&include_adult=false&query=${value}&page=${index}`
    )
      .then((r) => r.json())
      .then((result) => {
        setTimeout(() => {
          setMovies(result.results);
          setPages(Array.from({ length: result.total_pages }, (v, x) => x + 1));
          setLoading(false);
        }, 1000);
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
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Name of movie"
            />
            <button
              class="btn btn-outline-primary"
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
        <div className=" d-flex justify-content-center">
          <nav aria-label="...">
            <ul className="pagination">
              {movies &&
                pages &&
                pages.length > 1 &&
                pages.map((page) => {
                  return (
                    <li
                      key={page}
                      onClick={(e) => setIndex(page)}
                      className="page-item"
                    >
                      <a
                        className={`page-link ${index == page ? "active" : ""}`}
                        href="#"
                      >
                        {page}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default App;
