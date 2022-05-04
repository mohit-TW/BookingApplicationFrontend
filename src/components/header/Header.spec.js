import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";
import { Typography } from "@material-ui/core";
import { render} from "@testing-library/react";
import {when} from "jest-when";
import '@testing-library/jest-dom/extend-expect';
import useToggles from "../toggles/hooks/useToggles";
import { FeatureToggleProvider} from "react-feature-toggles/lib";


jest.mock("../toggles/hooks/useToggles", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("Basic rendering", () => {
  const testOnLogout = jest.fn();

when(useToggles).calledWith().mockReturnValue({
  toggleNames:{
      VIEW_USER_PROFILE: 'VIEW_USER_PROFILE'
     },      
  toggles:{
   VIEW_USER_PROFILE : true,
 }
});

  describe("On authenticated", () => {
    const testToggles = {
      VIEW_USER_PROFILE: true
      };

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

    it("Should render the user profile section if authenticated", () => {
      const headerComponent = shallow(
        <Header isAuthenticated={true} onLogout={testOnLogout} />
      );
  
      const typographyComponents = headerComponent.find(Typography);
      const userDivComponent = headerComponent.find("div");
      const userProfileTypographyComponent = typographyComponents
        .at(0)
        .find("iconButton");
    });   
    
    it("Should not render the user profile section if authenticated and feature disabled", () => {
      testToggles.VIEW_USER_PROFILE=false;
      const {queryByTestId} = render(
        <FeatureToggleProvider featureToggleList={testToggles}>
            <Header isAuthenticated={true} onLogout={testOnLogout} />
        </FeatureToggleProvider>
      );

      expect(queryByTestId("profileIcon")).toBeNull();
    });  
  
  });

  describe("On unAuthenticated", () => {
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
  
  })
});

