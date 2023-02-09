import * as yup from "yup"

export const signUpSchema = yup.object().shape({
    name: yup.string().required("name required"),
    phone: yup.string().required("phone required"),
    email: yup.string().required("email required").email("invalid email"),
    password: yup.string().required("password required"),
})

export const signInSchema = yup.object().shape({
    email: yup.string().required("Email required").email("Invalid email"),
    password: yup.string().required("Password required"),
})

export const createContactSchema = yup.object().shape({
    name: yup.string().required("name required"),
    phone: yup.string().required("phone required"),
    email: yup.string().required("email required").email("invalid email"),
})

export const updateContactSchema = yup.object().shape({
    name: yup.string(),
    phone: yup.string(),
    email: yup.string().email("invalid email"),
})
