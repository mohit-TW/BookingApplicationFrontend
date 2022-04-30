import moment from "moment";
import { date } from "yup";
import { object, string, ref } from "yup";
import apiService from "../../../helpers/apiService";

export const initialValues = {
    name: "",
    username: "",
    dob: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
};

const PASSWORD_PATTERN = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,64})"
);
const NAME_PATTERN = new RegExp("^(?![\\s.]+$)[a-zA-Z\\s.]*$");

export const formSchema = object({
    name: string("Enter name")
        .required("Name is required")
        .matches(NAME_PATTERN, "Name can only have letters, space and ."),
    username: string("Enter username").required("Username is required"),
    dob: date().max(new Date(), "You can't be born in the future!").required("DOB is required"),
    email: string("Enter email")
        .required("Email is required")
        .email("Email is invalid."),
    phoneNumber: string("Enter mobile number")
        .required("Mobile Number is required")
        .matches(/^[1-9][0-9]{9}$/, "Mobile number is invalid"),
    password: string("Enter password")
        .required("Password is required")
        .matches(PASSWORD_PATTERN, "Password is invalid"),
    confirmPassword: string("Enter confirm password")
        .required("Confirm password is required")
        .oneOf([ref("password"), null], "Confirm Password doesn't match password"),
});

export default {
    create: async (payload) => {
        return await apiService.postSignup("signup", payload);
    },
};
