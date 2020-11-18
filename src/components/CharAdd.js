import React from "react"
import axiosAuth from "../utils/axiosAuth"
import { useHistory, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

const charAddchema = Yup.object({
    name: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    description: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    ancestry: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    class: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
})

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
            validationSchema={charAddchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                createChar(values)
                setSubmitting(false)
                resetForm()
            }}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <label>Character's Name:</label>
                    <Field type="text" name="name" />

                    {errors.name && touched.name ? (
                        <div className="error">{errors.name}</div>
                    ) : null}

                    <label>Character's Ancestry:</label>
                    <Field type="text" name="ancestry" />

                    {errors.ancestry && touched.ancestry ? (
                        <div className="error">{errors.ancestry}</div>
                    ) : null}

                    <label>Character's Level</label>
                    <Field as="select" name="level">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                    </Field>

                    <label>Character's Class:</label>
                    <Field type="text" name="class" />

                    {errors.class && touched.class ? (
                        <div className="error">{errors.class}</div>
                    ) : null}

                    <label>Character's Description:</label>
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

export default CharAdd