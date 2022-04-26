import {useEffect, useState} from 'react';
import moviesService from '../services/moviesService';


const useMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        moviesService.fetchAllMovies().then(movie => {
            setMovies(movie);
        });
        // eslint-disable-next-line
    }, [movies]);

    return movies;
}

export default useMovies;
