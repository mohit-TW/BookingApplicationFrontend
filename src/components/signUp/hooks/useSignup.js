import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/signupStyles"
import signupFormService from "../services/signupFormService";

export default () => {
    const classes = styles();
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [dobError, setdobError] = useState(false);
    const [success, setSuccess] = useState(false);
 
    const errorMessage = () => {
        if (error!=='') {
            return (
                <Typography variant="body1" color="error" className={classes.signupErrorMessage}>
                    {
                        error
                    }
                </Typography>
            )
        }

        
    };

    const handleSignup = async (values, history) => {
        setPhoneError(false);
        setShowError(false);
        setSuccess(false);
        const payload = {
                  name: values.name,
                  username: values.username,
                  dob: values.dob,
                  email: values.email,
                  phoneNumber: values.phoneNumber,
                  password: values.password,
                  confirmPassword: values.confirmPassword,
        };
        try {
            const response = await signupFormService.create(payload);
            setSuccess(true);
        } catch (err) {
            if (err.response && err.response.status === 400) {
                if(err.response.data.details[0]==="Phone Number already exists")
                    setPhoneError(true)
                else if (err.response.data.details[0]==="Invalid Date Of Birth") {
                    setdobError(true)
                }
                else 
                    setShowError(true);
                setError(err.response.data.details[0]);
            } else {
                throw err;
            }
        }
    };

    return {
        errorMessage: errorMessage,
        handleSignup: handleSignup,
        success: success,
        showError: showError,
        phoneError: phoneError,
        dobError: dobError
    };
};