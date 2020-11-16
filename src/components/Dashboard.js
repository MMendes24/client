import React, { useEffect } from "react"
import axiosAuth from "../utils/axiosAuth"

const Dashboard = (props) => {

    const getCampaigns = () => {
        axiosAuth().get("/campaigns")
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log("didn't work")
            })
    }

    useEffect(() => {
        getCampaigns()
    }, [])

    return (
        <div>Dash works</div>
    )
}

export default Dashboard