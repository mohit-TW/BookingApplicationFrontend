import { renderHook } from "@testing-library/react-hooks";
import moviesService from "../services/moviesService";
import useMovies from "./useMovies";
import { when } from "jest-when";

jest.mock("../services/moviesService", () => ({
  __esModule: true,
  default: {
    fetchAllMovies: jest.fn(),
  },
}));

describe("Basic Rendering", () => {
  let scheduleMovie = {
    movieId: null,
  };

  beforeEach(() => {
    when(moviesService.fetchAllMovies)
      .calledWith()
      .mockResolvedValue([
        {
          duration: "1h 30m",
          id: "title_1",
          imdbRating: 6.9,
          name: "Movie 1",
          plot: "Movie Description 1",
          posterLink:
            "https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_SX300.jpg",
        },
        {
          duration: "1h 30m",
          id: "title_2",
          imdbRating: 6.9,
          name: "Movie 2",
          plot: "Movie Description 2",
          posterLink:
            "https://m.media-amazon.com/images/M/MN5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_SX300.jpg",
        },
      ]);
  });

  it("Should initialise the hook with empty movies list", () => {
    const { result } = renderHook(() => useMovies(scheduleMovie));

    const { movies } = result.current;

    expect(movies).toEqual([]);
  });

  it("Schould get movies after mount", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useMovies(scheduleMovie)
    );

    await waitForNextUpdate();
    const { movies } = result.current;

    expect(movies).toEqual([
      { value: "title_1", display: "Movie 1" },
      { value: "title_2", display: "Movie 2" },
    ]);
  });
});
