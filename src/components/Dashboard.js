import React, { useEffect, useState } from "react"
import axiosAuth from "../utils/axiosAuth"

import Campaign from "./Campaign"

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
        <section>
            {campaigns.map(campaign => (
                <Campaign key={campaign.id} campaign={campaign} />
            ))}
        </section>
    )
}

export default Dashboard