import React from "react";
import { FormikButton } from ".";
import { shallow } from "enzyme";
import { when } from "jest-when";
import { useField } from "formik";

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
        variant: "h6",
        type: "submit",
        color: "primary",
        name: "Testing Btn",
      };
    });

  it("should render the button", () => {
    when(useField).calledWith("test button").mockReturnValue([btnProps]);

    //const formikButtonComponent = shallow(<FormikTextField testProp="test prop value" name="test field"
    //                                                              label="test label"/>);

    const formikButtonComponent = shallow(
      <FormikButton
        testProp="test prop value"
        name="Testing Btn"
        color="primary"
        type="submit"
        variant="h5"
      />
    );

    //expect(formikButtonComponent.prop("name")).toBe("Testing Btn");
  });
});
