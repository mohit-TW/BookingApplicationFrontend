import React from 'react'
import Signup from './Signup'
import {getByTestId, render} from '@testing-library/react';
import '@testing-library/jest-dom'


describe('Signup From',()=>{
    it('should exist name,username, dob, email, password, phone no., signup btn, confirm password',async()=>{
        const{getByTestId} =render(<Signup/>,{});

        expect(getByTestId('name')).toBeDefined();
        expect(getByTestId('email')).toBeDefined();
        expect(getByTestId('dob')).toBeDefined();
        expect(getByTestId('mobileNumber')).toBeDefined();
        expect(getByTestId('password')).toBeDefined();
        expect(getByTestId('confirmPassword')).toBeDefined();
        expect(getByTestId('submit')).toBeDefined();
    })
})