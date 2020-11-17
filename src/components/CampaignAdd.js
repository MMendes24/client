import React from "react"
import axiosAuth from "../utils/axiosAuth"
import { useHistory, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

const campaignAddSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
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
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default CampaignAdd