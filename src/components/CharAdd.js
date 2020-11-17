import React from "react"
import axiosAuth from "../utils/axiosAuth"
import { useHistory, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik"

const CharAdd = () => {
    const history = useHistory()
    const { id } = useParams()

    const createChar = (values) => {
        axiosAuth()
            .post(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}/characters`, values)
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
                level: "",
                class: "",
                ancestry: "",
                description: "",
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                createChar(values)
                setSubmitting(false)
                resetForm()
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <label>Character's Name:</label>
                    <Field type="text" name="name" />
                    <label>Character's Description:</label>
                    <Field type="text" name="description" />
                    <label>Character's Ancestry:</label>
                    <Field type="text" name="ancestry" />
                    <label>Character's Level</label>
                    <Field as="select" name="level">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="3">4</option>
                        <option value="3">5</option>
                        <option value="3">6</option>
                        <option value="3">7</option>
                        <option value="3">8</option>
                        <option value="3">9</option>
                        <option value="3">10</option>
                        <option value="3">11</option>
                        <option value="3">12</option>
                        <option value="3">13</option>
                        <option value="3">14</option>
                        <option value="3">15</option>
                        <option value="3">16</option>
                        <option value="3">17</option>
                        <option value="3">18</option>
                        <option value="3">19</option>
                        <option value="3">20</option>
                    </Field>
                    <label>Character's Class:</label>
                    <Field type="text" name="class" />
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default CharAdd