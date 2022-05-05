import { useEffect, useState } from "react";
import featureToggleService from "../services/FeatureToggleService";

const useToggles = () => {

  const toggleNames = {
    MOVIE_SCHEDULE: 'MOVIE_SCHEDULE',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    VIEW_USER_PROFILE : 'VIEW_USER_PROFILE',
    CUSTOMER_BOOKING : 'CUSTOMER_BOOKING'
      };

  const [toggles,setFeatures] = useState({
    [toggleNames.MOVIE_SCHEDULE]: true,
    [toggleNames.CHANGE_PASSWORD]: true,
    [toggleNames.VIEW_USER_PROFILE] : true,
    [toggleNames.CUSTOMER_BOOKING] : true
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
