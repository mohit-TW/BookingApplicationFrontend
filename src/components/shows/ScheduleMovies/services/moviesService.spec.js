import apiService from "../../../../helpers/apiService";
import moviesService from "./moviesService";

jest.mock("../../../../helpers/apiService");

describe("Movies Service", () => {
  it("should return available movies", async () => {
    const mockData = [
      {
        duration: "1h 30m",
        id: "title_1",
        imdbRating: 6.9,
        name: "Movie",
        plot: "Movie Description",
        posterLink:
          "https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_SX300.jpg",
      },
    ];

    apiService.get.mockResolvedValueOnce({ data: mockData });

    const movies = await moviesService.fetchAllMovies();

    expect(movies).toHaveLength(1);
    expect(movies).toEqual([
      {
        duration: "1h 30m",
        id: "title_1",
        imdbRating: 6.9,
        name: "Movie",
        plot: "Movie Description",
        posterLink:
          "https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_SX300.jpg",
      },
    ]);
  });
});
