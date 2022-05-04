import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {when} from "jest-when";
import userService from './services/userService';
import ChangePasswordDialog from "./ChangePasswordDialog";
import UserProfile from "./UserProfile";
import '@testing-library/jest-dom/extend-expect';
import useToggles from "../toggles/hooks/useToggles";
import { FeatureToggleProvider} from "react-feature-toggles/lib";


jest.mock("./ChangePasswordDialog", () => {
    return ({open}) => <div>Change Password is {open ? "open" : "closed"}</div>
});

jest.mock("../toggles/hooks/useToggles", () => ({
    __esModule: true,
    default: jest.fn()
}));

describe("Basic rendering and functionality", () => {
    const openDialog = true;
    const onClose = jest.fn();
    const user = {username: "admin-user",
                  name: null,
                  dob: null,
                  mobileNo: null,
                  email: null,}
    const testToggles = {
                  CHANGE_PASSWORD: true
                  }

    when(useToggles).calledWith().mockReturnValue({
                    toggleNames:{
                        CHANGE_PASSWORD: 'CHANGE_PASSWORD'
                       },      
                    toggles:{
                     CHANGE_PASSWORD : true,
                   }
                });


    it("Should have Change password button when feature enabled", () => {
            const {getByTestId} = render(
            <FeatureToggleProvider featureToggleList={testToggles}>
             <UserProfile />
            </FeatureToggleProvider>);

            expect(getByTestId('button-1')).toHaveTextContent('CHANGE PASSWORD');
    });

    it("Should not have Change password button when feature disabled", () => {
        testToggles.CHANGE_PASSWORD=false;
            const {queryByText} = render(
            <FeatureToggleProvider featureToggleList={testToggles}>
             <UserProfile />
            </FeatureToggleProvider>);

            expect(queryByText("CHANGE PASSWORD")).toBeNull();
    });

    it("Should display Change password dialog on click of button when feature enabled", () => {
        testToggles.CHANGE_PASSWORD=true;
            const {getByText} = render(
            <FeatureToggleProvider featureToggleList={testToggles}>
                <UserProfile open={openDialog} onClose={onClose}/>
            </FeatureToggleProvider>);

            expect(getByText("Change Password is closed")).toBeTruthy();

            fireEvent.click(getByText("CHANGE PASSWORD"));

            expect(getByText("Change Password is open")).toBeTruthy();
    });

});