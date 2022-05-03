import { useEffect, useState } from "react";
import featureToggleService from "../services/FeatureToggleService";

const useToggles = () => {

  const toggleNames = {
    MOVIE_SCHEDULE: 'MOVIE_SCHEDULE',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    CUSTOMER_SIGN_UP : 'CUSTOMER_SIGN_UP',
    VIEW_USER_PROFILE : 'VIEW_USER_PROFILE'
      };

  const [toggles,setFeatures] = useState({
    [toggleNames.MOVIE_SCHEDULE]: true,
    [toggleNames.CHANGE_PASSWORD]: true,
    [toggleNames.CUSTOMER_SIGN_UP] : true,
    [toggleNames.VIEW_USER_PROFILE] : true
  });
  useEffect(() => {
    featureToggleService.fetch().then((feature) => {
      setFeatures({...toggles,...feature});
    });
  }, []);

  return{
    toggles: toggles,
    toggleNames:toggleNames,
  }
}

export default useToggles;
