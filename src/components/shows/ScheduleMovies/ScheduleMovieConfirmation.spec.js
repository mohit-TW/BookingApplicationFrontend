import { render } from "@testing-library/react";
import React from "react";
import ScheduleMovieConfirmation from "./ScheduleMovieConfirmation";
import "@testing-library/jest-dom/extend-expect";

describe("Basic Rendering", () => {
  const open = true;
  const onClose = jest.fn();

  it("Should display success alert", () => {
    const status = 1;

    const { getByTestId } = render(
      <ScheduleMovieConfirmation
        open={open}
        onClose={onClose}
        success={status}
        message={"Success! Movie Scheduled successfully"}
      />
    );
    expect(getByTestId("alert")).toHaveTextContent(
      "Success! Movie Scheduled successfully"
    );
  });

  it("Should display error alert", () => {
    const status = 0;

    const { getByTestId } = render(
      <ScheduleMovieConfirmation
        open={open}
        onClose={onClose}
        success={status}
        message={"Error! Movie Scheduled unsuccessfully"}
      />
    );
    expect(getByTestId("alert")).toHaveTextContent(
      "Error! Movie Scheduled unsuccessfully"
    );
  });
});
