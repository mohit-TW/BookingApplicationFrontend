import React from "react";
import {fireEvent, render, waitFor, screen} from "@testing-library/react";
import ChangePasswordConfirmation from "./ChangePasswordConfirmation";
import '@testing-library/jest-dom/extend-expect';


describe('Basic rendering', () => {
      const open = true;
      const onClose = jest.fn();
      it('should display success confirmation when password changed successfully', () => {
      const status= 1;

      const {getByTestId} = render(<ChangePasswordConfirmation open={open}
                                             onClose={onClose}
                                             success={status}
                                             />)
      expect(getByTestId('alert')).toHaveTextContent('Success! Login with new password');



    });

    it('should display failure message when password changed successfully', () => {
          const status= 0;

          const {getByTestId} = render(<ChangePasswordConfirmation open={open}
                                                 onClose={onClose}
                                                 success={status}
                                                 />)
          expect(getByTestId('alert')).toHaveTextContent('Sorry! Failed to change password');



        });
});