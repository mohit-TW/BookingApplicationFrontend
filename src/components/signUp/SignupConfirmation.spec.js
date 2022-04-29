import React from "react";
import {render} from "@testing-library/react";
import SignupConfirmation from "./SignupConfirmation";
import '@testing-library/jest-dom/extend-expect';


describe('Basic rendering', () => {
      const open = true;
      const onClose = jest.fn();
      it('should display success confirmation when signed up successfully', () => {

      const {getByTestId} = render(<SignupConfirmation open={open}
                                             onClose={onClose}
                                             />)
      expect(getByTestId('alert')).toHaveTextContent('Signup successful!');

    })});