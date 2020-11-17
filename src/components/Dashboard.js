import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosAuth from "../utils/axiosAuth"

import Campaign from "./Campaign"

const Dashboard = (props) => {
    const [campaigns, setCampaigns] = useState([])
    const { id } = useParams()

    const getCampaigns = () => {
        const verify = localStorage.getItem("user")
        if (verify === id) {
            axiosAuth().get(`campaigns/user-campaigns/${id}`)
            .then(res => {
                console.log(res.data)
                setCampaigns(res.data.campaigns)
            })
            .catch(err => {
                console.log("didn't work")
            })
        } else {
            console.error("wrong user")
        }
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