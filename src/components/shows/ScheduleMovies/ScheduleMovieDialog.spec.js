import React from "react";
import { shallow } from "enzyme";
import {fireEvent, render} from "@testing-library/react";
import ScheduleMovieDialog from './ScheduleMovieDialog';
import { FormikButton } from "../../formik";

describe('Basic Rendering', () => { 
    const onClose = jest.fn();
    it("should be able to render", ()=>{
        const scheduleMovie = shallow(<ScheduleMovieDialog open = {true} onClose = {onClose}/>);

        const scheduleHeaderDiv = scheduleMovie.find("div");
        const scheduleContentDiv = scheduleHeaderDiv.at(1);

        expect(scheduleHeaderDiv.at(0).text()).toBe("Schedule Movie");
        expect(scheduleContentDiv.find(FormikButton).prop("name")).toBe("SCHEDULE");
    })
 })