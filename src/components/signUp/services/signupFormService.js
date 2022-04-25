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

const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
export const formSchema = object({
    name: string("Enter name")
        .required("Name is required")
        .matches(/^[A-Za-z]+$/, "Name can only have letters."),
    username: string("Enter username").required("Username is required"),
    dob: string("Enter date of birth").required("Date of Birth is required"),
    email: string("Enter email")
        .required("Email is required")
        .email("Enter a valid email"),
    phoneNumber: string("Enter mobile number")
        .required("Mobile Number is required")
        .matches(/^[1-9][0-9]{9}$/, "Mobile number can only have 10 digits"),
    password: string("Enter password")
        .required("Password is required")
        .matches(strongRegex, "Password is invalid"),
    confirmPassword: string("Enter confirm password")
        .required("Confirm password is required")
        .oneOf([ref("password"), null], "Confirm Password doesn't match password"),
});

export default {
    create: async (payload) => {
        return await apiService.postSignup("signup", payload);
    },
};
