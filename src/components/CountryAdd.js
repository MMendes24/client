import React from "react"
import axiosAuth from "../utils/axiosAuth"
import { useHistory, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

const countryAddchema = Yup.object({
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

const CountryAdd = () => {
    const history = useHistory()
    const { id } = useParams()

    const createCountry = (values) => {
        axiosAuth()
            .post(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}/countries`, values)
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
                campaign_id: parseInt(id, 10),
                name: "",
                ruler: "",
                founded: "",
                description: "",
            }}
            validationSchema={countryAddchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                createCountry(values)
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

export default CountryAdd