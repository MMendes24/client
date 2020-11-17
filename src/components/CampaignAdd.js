import React from "react"
import axiosAuth from "../utils/axiosAuth"
import { useHistory, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik"

const CampaignAdd = () => {
    const history = useHistory()
    const { id } = useParams()

    const createCampaign = (values) => {
        axiosAuth()
            .post("https://campaign-journal-api.herokuapp.com/api/campaigns", values)
            .then(res => {
                console.log("Data sent")
                history.push(`/home/${id}`)
            })
            .catch(res => {
                console.error("Data rejected")
            })
    }

    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
                email: "",
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(false)
                resetForm()
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="username" name="username" />
                    <Field type="password" name="password" />
                    <Field type="email" name="email" />
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                        </button>
                </Form>
            )}
        </Formik>
    )
}

export default CampaignAdd