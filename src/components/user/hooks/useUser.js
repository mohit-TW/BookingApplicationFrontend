import { useEffect, useState } from "react";
import userService from "../services/userService";

const useUser = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    name: null,
    mobileNo: null,
    email: null,
  });

  useEffect(() => {
    userService.getLoggenInUserDetails().then((user) => {
    
      setUserDetails({...userDetails,username: user.username});
    });
    // eslint-disable-next-line
  }, []);

  return userDetails;
};

export default useUser;
