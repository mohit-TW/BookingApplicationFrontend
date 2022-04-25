import React from 'react'
import {act, renderHook} from "@testing-library/react-hooks";
import { createMemoryHistory } from 'history'
import {when} from "jest-when";
import useSignup from './useSignup'
import signupFormService from '../services/signupFormService';

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
})