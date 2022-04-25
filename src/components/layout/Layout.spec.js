import React from "react";
import Layout from "./Layout";
import Header from "../header/Header";
import RootRouter from "../router/RootRouter";
import useAuth from "./hooks/useAuth";
import { shallow } from "enzyme";

const testHandleLogin = jest.fn();
const testHandleLogout = jest.fn();

jest.mock("./hooks/useAuth", () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Basic rendering', function () {
    it("Should render correctly", () => {
        useAuth.mockReturnValue({
            isAuthenticated: true,
            handleLogin: testHandleLogin,
            handleLogout: testHandleLogout
        });
        const layoutComponent = shallow(<Layout/>);

        const headerComponent = layoutComponent.find(Header);
        const rootRouterComponent = layoutComponent.find(RootRouter);
        //const headerComponent = rootRouterComponent.findAllByRole(Header);
        expect(headerComponent.prop("onLogout")).toBe(testHandleLogout);
        expect(headerComponent.prop("isAuthenticated")).toBe(true);
        expect(rootRouterComponent.prop("onLogin")).toBe(testHandleLogin);
        expect(rootRouterComponent.prop("isAuthenticated")).toBe(true);
    })
});
