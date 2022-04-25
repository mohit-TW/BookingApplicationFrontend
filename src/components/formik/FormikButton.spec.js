import React from "react";
import { FormikButton } from ".";
import { shallow } from "enzyme";
//import {render} from "@testing-library/react";
import { when } from "jest-when";
import { useField } from "formik";
import { Button } from "@material-ui/core";
//import ShallowRenderer from 'react-test-renderer/shallow';

jest.mock("formik");

describe("Basic rendering", () => {
    let btnProps;

  //   function basicAssertions(formikTextFieldComponent) {
  //     expect(formikTextFieldComponent.prop("testProp")).toBe("test prop value");
  //     expect(formikTextFieldComponent.prop("name")).toBe("test field");
  //     expect(formikTextFieldComponent.prop("value")).toBe("test value field");
  //     expect(formikTextFieldComponent.prop("onChange")).toBe(
  //       "test on change field"
  //     );
  //     expect(formikTextFieldComponent.prop("onBlur")).toBe("test on blur field");
  //   }

    beforeEach(() => {
      btnProps = {
        variant: "contained",
        type: "submit",
        color: "primary",
        name: "Testing Btn",
      };
    });

  it("should render the button", () => {
    when(useField).calledWith("test button").mockReturnValue([btnProps]);

    //const formikButtonComponent = shallow(<FormikTextField testProp="test prop value" name="test field"
    //                                                              label="test label"/>);

    //const renderer = new ShallowRenderer();
    // renderer.render(<FormikButton
    //     testProp="test prop value"
    //     name="Testing Btn"
    //     color="primary"
    //     type="submit"
    //     variant="contained"
    //   />);
    const formikButtonComponent = shallow(
      <FormikButton
        testProp="test prop value"
        name="Testing Btn"
        color="primary"
        type="submit"
        variant="contained"
      />
    );
    
    const buttonComponent = formikButtonComponent.find(Button);
    expect(buttonComponent.prop("color")).toBe("primary");
    expect(buttonComponent.prop("testProp")).toBe("test prop value");
    expect(buttonComponent.prop("name")).toBe("Testing Btn");
    expect(buttonComponent.prop("type")).toBe("submit");
    expect(buttonComponent.prop("variant")).toBe("contained");
    
    
    //expect(formikButtonComponent.prop("name")).toBe("Testing Btn");
  });
});
