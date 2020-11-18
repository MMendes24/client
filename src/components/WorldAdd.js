import React from "react"
import axiosAuth from "../utils/axiosAuth"
import { useHistory, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

const worldAddSchema = Yup.object({
    name: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    description: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
})

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
            validationSchema={worldAddSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                createWorld(values)
                setSubmitting(false)
                resetForm()
            }}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <label>World Title:</label>
                    <Field type="text" name="name" />

                    {errors.name && touched.name ? (
                        <div className="error">{errors.name}</div>
                    ) : null}

                    <label>World Description:</label>
                    <Field type="text" name="description" />

                    {errors.description && touched.description ? (
                        <div className="error">{errors.description}</div>
                    ) : null}

                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default WorldAdd