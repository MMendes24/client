import React, { useEffect, useState } from "react"
import axiosAuth from "../utils/axiosAuth"
import { useHistory, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

const worldEditSchema = Yup.object({
    name: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    description: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
})

const initialWorld = {
    name: "",
    description: "",
    campaign_id: ""
}

const WorldEdit = () => {
    const history = useHistory()
    const { id, worldid } = useParams()
    const [world, setWorld] = useState(initialWorld)

    const getWorld = () => {
        axiosAuth()
            .get(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}/worlds/${worldid}`)
            .then(res => {
                console.log("Data retrieved")
                setWorld({
                    name: res.data.world.name,
                    description: res.data.world.description,
                    campaign_id: res.data.world.campaign_id
                })
            })
            .catch(err => {
                console.error("Unable to GET world")
            })
    }

    const editWorld = (values) => {
        axiosAuth()
            .put(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}/worlds/${worldid}`, values)
            .then(res => {
                console.log("Updated successfully")
                history.push(`/campaign/${id}`)
            })
            .catch(err => {
                console.error("Data rejected")
            })
    }

    useEffect(() => {
        getWorld()
    }, [])

    return (
        <Formik
            enableReinitialize
            initialValues={{
                name: world.name,
                description: world.description,
                campaign_id: world.campaign_id
            }}
            validationSchema={worldEditSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                editWorld(values)
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

export default WorldEdit