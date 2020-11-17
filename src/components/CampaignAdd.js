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
                name: "",
                desc: "",
                user_id: parseInt(id, 10)
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                createCampaign(values)
                setSubmitting(false)
                resetForm()
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <label>Campaign Title:</label>
                    <Field type="text" name="name" />
                    <label>Campaign Description:</label>
                    <Field type="text" name="desc" />
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default CampaignAdd