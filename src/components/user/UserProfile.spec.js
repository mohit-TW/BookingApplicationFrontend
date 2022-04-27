import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {when} from "jest-when";
import userService from './services/userService';
import ChangePasswordDialog from "./ChangePasswordDialog";
import UserProfile from "./UserProfile";
import '@testing-library/jest-dom/extend-expect';


jest.mock('./hooks/useUser', () => {
    return jest.fn(() => ({
       user: {username: "admin-user",
                                password: "",
                                name: null,
                                mobileNo: null,
                                email: null,
    }}))
})



jest.mock("./ChangePasswordDialog", () => {
    return ({open}) => <div>Change Password is {open ? "open" : "closed"}</div>
});

describe("Basic rendering and functionality", () => {
    const openDialog = true;
    const onClose = jest.fn();
    const user = {username: "admin-user",
                  password: "",
                  name: null,
                  mobileNo: null,
                  email: null,}


    it("Should have Change password button", () => {

            const {getByTestId} = render(<UserProfile />);

            expect(getByTestId('button-1')).toHaveTextContent('CHANGE PASSWORD');
    });

    it("Should display Change password dialog on click of button", () => {
            const {getByText} = render(<UserProfile open={openDialog}
                                                            onClose={onClose}/>);

            expect(getByText("Change Password is closed")).toBeTruthy();

            fireEvent.click(getByText("CHANGE PASSWORD"));

            expect(getByText("Change Password is open")).toBeTruthy();
    });
    it("Should exist username", () => {

            const {getByTestId} = render(<UserProfile />);

            expect(getByTestId('username')).toBeDefined();
    });


});