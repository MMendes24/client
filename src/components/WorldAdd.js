import React from "react"
import axiosAuth from "../utils/axiosAuth"
import { useHistory, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik"

const WorldAdd = () => {
    const history = useHistory()
    const { id } = useParams()

    const createWorld = (values) => {
        axiosAuth()
            .post(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}/worlds`, values)
            .then(res => {
                console.log("Data sent")
                history.push(`/campaign/${id}`)
            })
            .catch(res => {
                console.error("Data rejected")
            })
    }

    return (
        <Formik
            initialValues={{
                name: "",
                description: "",
                campaign_id: parseInt(id, 10)
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                createWorld(values)
                setSubmitting(false)
                resetForm()
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <label>World Title:</label>
                    <Field type="text" name="name" />
                    <label>World Description:</label>
                    <Field type="text" name="description" />
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default WorldAdd