import React, { useEffect, useState } from "react"
import axiosAuth from "../utils/axiosAuth"

import Campaign from "./Campaign"

const Dashboard = (props) => {
    const [campaigns, setCampaigns] = useState([])

    const getCampaigns = () => {
        axiosAuth().get("/campaigns")
            .then(res => {
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
            <div className="card-catalogue">
                {campaigns.map(campaign => (
                    <Campaign key={campaign.id} campaign={campaign} />
                ))}
            </div>
        </section>
    )
}

export default Dashboard