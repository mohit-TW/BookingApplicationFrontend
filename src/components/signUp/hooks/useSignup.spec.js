import React from 'react'
import {act, renderHook} from "@testing-library/react-hooks";
import { createMemoryHistory } from 'history'
import {when} from "jest-when";
import useSignup from './useSignup'
import signupFormService from '../services/signupFormService';
import Signup from '../Signup';
import {render} from "@testing-library/react";

jest.mock("../services/signupFormService", () => ({
    __esModule: true,
    default: {
        create: jest.fn()
    }
}));

describe("Signup evaluation", ()=> {

    const name = "user"
    const username = "user"
    const dob  =  "1996-04-19"
    const email = "user@email.com"
    const phoneNumber = "6578902422"
    const password = "Password@2"
    const confirmPassword =  "Password@2"

    const signUpValues = {
        name: name,
        username: username,
        dob: dob,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        confirmPassword: confirmPassword,
    }    

    it("should initially not show error message", () => {
        const testOnSignUp = jest.fn();
        const renderHookResult = renderHook(() => useSignup(testOnSignUp));
        const result = renderHookResult.result;
        const {errorMessage} = result.current;

        expect(errorMessage()).toBe(undefined);
    });

    it("should not show error message if signed up succesfully", async () => {
        const testOnSignUp = jest.fn();
        when(signupFormService.create).calledWith(signUpValues).mockResolvedValue("Unused");
        const history = createMemoryHistory();
        const renderHookResult = renderHook(() => useSignup(testOnSignUp));
        const result = renderHookResult.result;
        const {handleSignup} = result.current;

        await act(() => handleSignup(signUpValues, history));

        const {errorMessage} = result.current;
        expect(signupFormService.create).toBeCalledTimes(1);
        expect(signupFormService.create).toHaveBeenCalledWith(signUpValues);
        expect(errorMessage()).toBe(undefined);
    });

    it("should show error message when the name is invalid", async () => {

    const newSignUpValues = {...signUpValues, name:"user1"}
        const testOnSignUp = jest.fn();
        const component = render(<Signup/>);
        when(signupFormService.create).calledWith(newSignUpValues);
        const history = createMemoryHistory();
        const renderHookResult = renderHook(() => useSignup(testOnSignUp));
        const result = renderHookResult.result;
        const {handleSignup} = result.current;

        await act(() => handleSignup(newSignUpValues, history));

        const errorMessage = component.getByTestId("name").getAttribute("helperText")
        expect(signupFormService.create).toBeCalledTimes(2);
        expect(signupFormService.create).toHaveBeenCalledWith(newSignUpValues);
        expect(errorMessage === "Name can only have letters.");
    });

    it("should show error message when the email is invalid", async () => {

        const newSignUpValues = {...signUpValues, email:"useremail.com"}
            const testOnSignUp = jest.fn();
            const component = render(<Signup/>);
            when(signupFormService.create).calledWith(newSignUpValues);
            const history = createMemoryHistory();
            const renderHookResult = renderHook(() => useSignup(testOnSignUp));
            const result = renderHookResult.result;
            const {handleSignup} = result.current;
    
            await act(() => handleSignup(newSignUpValues, history));
    
            const errorMessage = component.getByTestId("email").getAttribute("helperText")
            expect(signupFormService.create).toBeCalledTimes(3);
            expect(signupFormService.create).toHaveBeenCalledWith(newSignUpValues);
            expect(errorMessage === "Email is invalid.");
        });


        it("should show error message when the password is invalid", async () => {

            const newSignUpValues = {...signUpValues, password:"password"}
                const testOnSignUp = jest.fn();
                const component = render(<Signup/>);
                when(signupFormService.create).calledWith(newSignUpValues);
                const history = createMemoryHistory();
                const renderHookResult = renderHook(() => useSignup(testOnSignUp));
                const result = renderHookResult.result;
                const {handleSignup} = result.current;
        
                await act(() => handleSignup(newSignUpValues, history));
        
                const errorMessage = component.getByTestId("password").getAttribute("helperText")
                expect(signupFormService.create).toBeCalledTimes(4);
                expect(signupFormService.create).toHaveBeenCalledWith(newSignUpValues);
                expect(errorMessage === "Password is invalid.");
        });

        it("should show error message when the confirm password doesn't match password", async () => {

            const newSignUpValues = {...signUpValues, password:"Password@1", confirmPassword:"Password@2"}
                const testOnSignUp = jest.fn();
                const component = render(<Signup/>);
                when(signupFormService.create).calledWith(newSignUpValues);
                const history = createMemoryHistory();
                const renderHookResult = renderHook(() => useSignup(testOnSignUp));
                const result = renderHookResult.result;
                const {handleSignup} = result.current;
        
                await act(() => handleSignup(newSignUpValues, history));
        
                const errorMessage = component.getByTestId("confirmPassword").getAttribute("helperText")
                expect(signupFormService.create).toBeCalledTimes(5);
                expect(signupFormService.create).toHaveBeenCalledWith(newSignUpValues);
                expect(errorMessage === "Confirm Password doesn't match password");
        });

        it("should show error message when the mobile number is invalid", async () => {

            const newSignUpValues = {...signUpValues, phoneNumber:"0123456789"}
                const testOnSignUp = jest.fn();
                const component = render(<Signup/>);
                when(signupFormService.create).calledWith(newSignUpValues);
                const history = createMemoryHistory();
                const renderHookResult = renderHook(() => useSignup(testOnSignUp));
                const result = renderHookResult.result;
                const {handleSignup} = result.current;
        
                await act(() => handleSignup(newSignUpValues, history));
        
                const errorMessage = component.getByTestId("mobileNumber").getAttribute("helperText")
                expect(signupFormService.create).toBeCalledTimes(6);
                expect(signupFormService.create).toHaveBeenCalledWith(newSignUpValues);
                expect(errorMessage === "Mobile number is invalid");
        });

})