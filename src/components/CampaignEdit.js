import React, { useEffect, useState } from "react"
import axiosAuth from "../utils/axiosAuth"
import { useHistory, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik"

const initialCamp = {
    name: "",
    desc: "",
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
                    desc: res.data.campaigns.desc,
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
                desc: camp.desc,
                user_id: camp.user_id
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                editCampaign(values)
                setSubmitting(false)
                resetForm()
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <label>Campaign Title:</label>
                    <Field type="name" name="name" />
                    <label>Campaign Description:</label>
                    <Field type="desc" name="desc" />
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                </button>
                </Form>
            )}
        </Formik>
    )
}

export default CampaignEdit