import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";
import { Typography } from "@material-ui/core";
import { fireEvent } from "@testing-library/react";

describe("Basic rendering", () => {
  const testOnLogout = jest.fn();

  it("Should not render the logout section if not authenticated", () => {
    const headerComponent = shallow(
      <Header isAuthenticated={false} onLogout={testOnLogout} />
    );

    const typographyComponent = headerComponent.find(Typography);
    const missingLogoutDivComponent = headerComponent.find("div");
    expect(missingLogoutDivComponent.length).toBe(0);
    expect(typographyComponent.length).toBe(1);
    expect(typographyComponent.text()).toBe("SkyFox Cinema");
  });

  it("Should render the logout section if authenticated", () => {
    const headerComponent = shallow(
      <Header isAuthenticated={true} onLogout={testOnLogout} />
    );

    const typographyComponents = headerComponent.find(Typography);
    const logoTypographyComponent = typographyComponents.at(0);
    const logoutDivComponent = headerComponent.find("div");
    const logoutTypographyComponent = typographyComponents.at(1);
    expect(logoutDivComponent.at(2).prop("onClick")).toBe(testOnLogout);
    expect(logoutTypographyComponent.text()).toBe("Logout");
    expect(logoTypographyComponent.length).toBe(1);
    expect(logoTypographyComponent.text()).toBe("SkyFox Cinema");
  });

  it("Should not render the user profile section if not authenticated", () => {
    const headerComponent = shallow(
      <Header isAuthenticated={false} onLogout={testOnLogout} />
    );

    const typographyComponent = headerComponent.find(Typography);
    const missingLogoutDivComponent = headerComponent.find("div");
    expect(missingLogoutDivComponent.length).toBe(0);
    expect(typographyComponent.length).toBe(1);
    expect(typographyComponent.text()).toBe("SkyFox Cinema");
  });

  it("Should render the user profile section if authenticated", () => {
    const headerComponent = shallow(
      <Header isAuthenticated={true} onLogout={testOnLogout} />
    );

    const typographyComponents = headerComponent.find(Typography);
    const userDivComponent = headerComponent.find("div");
    const userProfileTypographyComponent = typographyComponents
      .at(0)
      .find("iconButton");
    console.log("icon" + userProfileTypographyComponent.context);
  });

});

// describe("Functional Rendering", () => {
//   jest.mock(onLogout);

//   it("should be able to redirect to user profile when profile icon is clicked", () => {
//     const { getByTestId } = render(
//       <Header isAuthenticated={true} onLogout={testOnLogout} />
//     );

//     expect(get)
//   });
// });
