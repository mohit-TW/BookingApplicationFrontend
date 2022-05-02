import { useEffect, useState } from "react";
import moviesService from "../services/moviesService";

const useMovies = (scheduleMovie) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    moviesService.fetchAllMovies().then((movieList) => {
       const result = movieList.map((movie)=>{
            return {
                value: movie.id,
                display: movie.name,
              };
        })
      setMovies([...result]);
      scheduleMovie.movieId = result[0].value;
    });
    // eslint-disable-next-line
  }, []);

  return {
    movies: movies,
  };
};

export default useMovies;
