import { useEffect, useState } from "react";
import userService from "../services/userService";
import userDetailsService from "../services/userDetailsService"

const useUser = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    name: null,
    dob: null,
    mobileNo: null,
    email: null,
    role: "",
  });

  const [user, setuser] = useState([])
  const [error, setError] = useState(false);

  useEffect(() => {
    userService.getLoggenInUserDetails().then((user) => {
      setUserDetails({ ...userDetails, username: user.username, role: user.role });
    });
    // eslint-disable-next-line
  }, []);

  const getLoggedInUser = () => {
    const user = userService.getLoggenInUserDetails();
    if (!user.username) {
      setUserDetails({ ...userDetails, username: user.username });
    }
    return userDetails;
  }

  const getDetails = async (name) => {
    try {
      const response = await userDetailsService.fetch(name);
      setUserDetails({ ...userDetails, username: response.data.username, name: response.data.name, dob: response.data.dob, email: response.data.email, mobileNo: response.data.phoneNumber });
    }
    catch (err) {
      if (err.response && err.response.status === 404) {
        setUserDetails({ ...userDetails });
        setError(true);
      }
      else {
        setError(true);
        throw err;
      }
    }

  }

  return { user: userDetails, getDetails: getDetails, error: error, getLoggedInUser };
};

export default useUser;
