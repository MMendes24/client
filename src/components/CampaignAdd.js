import React from "react"
import axiosAuth from "../utils/axiosAuth"
import { useHistory, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

const campaignAddSchema = Yup.object({
    name: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    description: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
})


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
                console.log(values)
                console.error("Data rejected")
            })
    }

    return (
        <Formik
            initialValues={{
                name: "",
                description: "",
                user_id: parseInt(id, 10)
            }}
            validationSchema={campaignAddSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                createCampaign(values)
                setSubmitting(false)
                resetForm()
            }}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <label>Campaign Title:</label>
                    <Field type="text" name="name" />

                    {errors.name && touched.name ? (
                        <div className="error">{errors.name}</div>
                    ) : null}

                    <label>Campaign Description:</label>
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

export default CampaignAdd