import React from "react"
import axios from "axios"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

const registerSchema = Yup.object({
    username: Yup.string()
        .max(256, 'Maximum length of 256 characters and it must be unique.')
        .required('Required.'),
    password: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    email: Yup.string().email()
        .max(256, 'Enter a valid and unique email address.')
        .required('Required.'),
})

const RegisterForm = () => {

    const userRegister = (values) => {
        axios.post("https://campaign-journal-api.herokuapp.com/api/users/register", values)
            .then(res => {
                console.log("Data sent")
            })
            .catch(res => {
                console.log("Data rejected")
            })
    }

    return (
        <div>
            <h1>Register an account</h1>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                    email: "",
                }}
                validationSchema={registerSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    userRegister(values)
                    setSubmitting(false)
                    resetForm()
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <label>Username:</label>
                        <Field type="username" name="username" />

                        {errors.username && touched.username ? (
                            <div className="error">{errors.username}</div>
                        ) : null}

                        <label>Password:</label>
                        <Field type="password" name="password" />

                        {errors.password && touched.password ? (
                            <div className="error">{errors.password}</div>
                        ) : null}

                        <label>Email:</label>
                        <Field type="email" name="email" />

                        {errors.email && touched.email ? (
                            <div className="error">{errors.email}</div>
                        ) : null}

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default RegisterForm