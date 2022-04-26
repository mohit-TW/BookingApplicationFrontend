import React from "react";
import changePasswordService from "./services/changePasswordService";
import { __esModule } from "yup";

jest.mock("./services/changePasswordService", ()=> ({
    __esModule: true,
    default: {
        create: jest.fn()
    }
}));

describe("basic render", () => {
    const open = true;
    const onClose = jest.fn();
  
  it("should not render when user is not authenticated", () => {

  });
});
