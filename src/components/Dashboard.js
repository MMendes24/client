import React, { useEffect, useState } from "react"
import axiosAuth from "../utils/axiosAuth"

const Dashboard = (props) => {
    const [campaigns, setCampaigns] = useState([])

    const getCampaigns = () => {
        axiosAuth().get("/campaigns")
            .then(res => {
                console.log(res.data.campaigns[0])
                setCampaigns(res.data.campaigns)
            })
            .catch(err => {
                console.log("didn't work")
            })
    }

    useEffect(() => {
        getCampaigns()
    }, [])

    return (
        <div>
            {/* {campaigns.map(campaign => (
                <h2 key={campaign.id}> {campaign.name}</h2>
            ))} */}
            <h2>Temp header</h2>
        </div>
    )
}

export default Dashboard