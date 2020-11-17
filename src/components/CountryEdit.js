import React, { useEffect, useState } from "react"
import axiosAuth from "../utils/axiosAuth"
import { useHistory, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik"

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
            onSubmit={(values, { setSubmitting, resetForm }) => {
                editCountry(values)
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

export default CountryEdit