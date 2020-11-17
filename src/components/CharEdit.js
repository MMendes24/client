import React, { useEffect, useState } from "react"
import axiosAuth from "../utils/axiosAuth"
import { useHistory, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik"

const initialChar = {
    campaign_id: "",
    name: "",
    level: "",
    class: "",
    ancestry: "",
    description: "",
}

const CharEdit = () => {
    const history = useHistory()
    const { id, charId } = useParams()
    const [char, setChar] = useState(initialChar)

    const getChar = () => {
        axiosAuth()
            .get(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}/characters/${charId}`)
            .then(res => {
                console.log("Data retrieved")
                console.log(res.data)
                setChar({
                    campaign_id: res.data.character.campaign_id,
                    name: res.data.character.name,
                    level: res.data.character.level,
                    class: res.data.character.class,
                    ancestry: res.data.character.ancestry,
                    description: res.data.character.description,
                })
            })
            .catch(err => {
                console.error("Unable to GET world")
            })
    }

    const editChar = (values) => {
        axiosAuth()
            .put(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}/characters/${charId}`, values)
            .then(res => {
                console.log("Updated successfully")
                history.push(`/campaign/${id}`)
            })
            .catch(err => {
                console.error("Data rejected")
            })
    }

    useEffect(() => {
        getChar()
    }, [])

    return (
        <Formik
            enableReinitialize
            initialValues={{
                campaign_id: char.campaign_id,
                name: char.name,
                level: char.level,
                class: char.class,
                ancestry: char.ancestry,
                description: char.description,
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                editChar(values)
                setSubmitting(false)
                resetForm()
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <label>Character's Name:</label>
                    <Field type="text" name="name" />
                    <label>Character's Ancestry:</label>
                    <Field type="text" name="ancestry" />
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

export default CharEdit