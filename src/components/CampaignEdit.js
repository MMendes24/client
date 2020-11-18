import React, { useEffect, useState } from "react"
import axiosAuth from "../utils/axiosAuth"
import { useHistory, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

const campaignEditSchema = Yup.object({
    name: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    description: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
})

const initialCamp = {
    name: "",
    description: "",
    user_id: ""
}

const CampaignEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const [camp, setCamp] = useState(initialCamp)

    const getCampaign = () => {
        axiosAuth()
            .get(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}`)
            .then(res => {
                console.log("Data retrieved")
                setCamp({
                    name: res.data.campaigns.name,
                    description: res.data.campaigns.description,
                    user_id: res.data.campaigns.user_id
                })
            })
            .catch(err => {
                console.error("Unable to GET campaign")
            })
    }

    const editCampaign = (values) => {
        axiosAuth()
            .put(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}`, values)
            .then(res => {
                console.log("Updated successfully")
                history.push(`/campaign/${id}`)
            })
            .catch(err => {
                console.error("Data rejected")
            })
    }

    useEffect(() => {
        getCampaign()
    }, [])

    return (
        <Formik
            enableReinitialize
            initialValues={{
                name: camp.name,
                description: camp.description,
                user_id: camp.user_id
            }}
            validationSchema={campaignEditSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                editCampaign(values)
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

export default CampaignEdit