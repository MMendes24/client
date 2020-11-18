import React, { useEffect, useState } from "react"
import axiosAuth from "../utils/axiosAuth"
import { useHistory, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

const countryEditSchema = Yup.object({
    name: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    description: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    ruler: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    founded: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
})

const initialCountry = {
    campaign_id: "",
    name: "",
    founded: "",
    ruler: "",
    description: "",
}

const CountryEdit = () => {
    const history = useHistory()
    const { id, countryId } = useParams()
    const [country, setCountry] = useState(initialCountry)

    const getCountry = () => {
        axiosAuth()
            .get(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}/countries/${countryId}`)
            .then(res => {
                console.log("Data retrieved")
                setCountry({
                    campaign_id: res.data.country.campaign_id,
                    name: res.data.country.name,
                    founded: res.data.country.founded,
                    ruler: res.data.country.ruler,
                    description: res.data.country.description,
                })
            })
            .catch(err => {
                console.error("Unable to GET world")
            })
    }

    const editCountry = (values) => {
        axiosAuth()
            .put(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}/countries/${countryId}`, values)
            .then(res => {
                console.log("Updated successfully")
                history.push(`/campaign/${id}`)
            })
            .catch(err => {
                console.error("Data rejected")
            })
    }

    useEffect(() => {
        getCountry()
    }, [])

    return (
        <Formik
            enableReinitialize
            initialValues={{
                campaign_id: country.campaign_id,
                name: country.name,
                founded: country.founded,
                ruler: country.ruler,
                description: country.description,
            }}
            validationSchema={countryEditSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                editCountry(values)
                setSubmitting(false)
                resetForm()
            }}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <label>Country's Name:</label>
                    <Field type="text" name="name" />

                    {errors.name && touched.name ? (
                        <div className="error">{errors.name}</div>
                    ) : null}


                    <label>Country's Ruler:</label>
                    <Field type="text" name="ruler" />

                    {errors.ruler && touched.ruler ? (
                        <div className="error">{errors.ruler}</div>
                    ) : null}

                    <label>Founded</label>
                    <Field type="text" name="founded" />

                    {errors.founded && touched.founded ? (
                        <div className="error">{errors.founded}</div>
                    ) : null}

                    <label>Description:</label>
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

export default CountryEdit