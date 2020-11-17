import React from "react"
import axiosAuth from "../utils/axiosAuth"
import { useHistory, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik"

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
            onSubmit={(values, { setSubmitting, resetForm }) => {
                createCountry(values)
                setSubmitting(false)
                resetForm()
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <label>Country's Name:</label>
                    <Field type="text" name="name" />
                    <label>Country's Ruler:</label>
                    <Field type="text" name="ruler" />
                    <label>Founded</label>
                    <Field type="text" name="founded" />
                    <label>Description:</label>
                    <Field type="text" name="description" />

                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default CountryAdd