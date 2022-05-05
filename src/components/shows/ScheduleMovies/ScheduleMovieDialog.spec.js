import React from "react";
import { shallow } from "enzyme";
import { fireEvent, render } from "@testing-library/react";
import ScheduleMovieDialog from "./ScheduleMovieDialog";
import {
  FormikButton,
  FormikCheckbox,
  FormikSelect,
  FormikTextField,
} from "../../formik";
import { Typography } from "@material-ui/core";

describe("Basic Rendering", () => {
  const onClose = jest.fn();
  it("should be able to render", () => {
    const scheduleMovie = shallow(
      <ScheduleMovieDialog open={true} onClose={onClose} />
    );

    const scheduleHeaderDiv = scheduleMovie.find("div");
    const scheduleContentDiv = scheduleHeaderDiv.at(1);
    const movieDropdown = scheduleContentDiv.find(FormikSelect);
    const componentTypography = scheduleContentDiv.find(Typography);
    const slotCheckboxes = scheduleContentDiv.find(FormikCheckbox);
    const costTextField = scheduleContentDiv.find(FormikTextField);
    const scheduleButton = scheduleContentDiv.find(FormikButton);

    expect(scheduleHeaderDiv.at(0).text()).toBe("Schedule Movie");
    expect(movieDropdown.prop("name")).toBe("movieId");
    expect(componentTypography.length).toBe(1);
    expect(slotCheckboxes.prop("name")).toBe("slotIds");
    expect(costTextField.prop("name")).toBe("cost");
    expect(scheduleButton.prop("name")).toBe("SCHEDULE");
  });
});
