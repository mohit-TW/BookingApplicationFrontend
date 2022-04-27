import { when } from "jest-when";
import movieService from './moviesService'
import apiService from "../../../helpers/apiService";

jest.mock('../../../helpers/apiService');

describe('Movie Service', () => {

    it('should return all movies', async () => {
        const data = [{
            duration: "1h 30m",
            id: "title_1",
            imdbRating: 6.9,
            name: "movie_1",
            plot: "description",
            posterLink: "link"
        },
        {
            duration: "1h 30m",
            id: "title_2",
            imdbRating: 6.9,
            name: "movie_2",
            plot: "description",
            posterLink: "link"
        }]

        apiService.get.mockResolvedValue({ data: data });
        const movies = await movieService.fetchAllMovies();

        expect(movies).toHaveLength(2);

        expect(movies).toEqual([{
            duration: "1h 30m",
            id: "title_1",
            imdbRating: 6.9,
            name: "movie_1",
            plot: "description",
            posterLink: "link"
        },
        {
            duration: "1h 30m",
            id: "title_2",
            imdbRating: 6.9,
            name: "movie_2",
            plot: "description",
            posterLink: "link"
        }]);
    });
});
