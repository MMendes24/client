import React from "react"
import { Link } from "react-router-dom"

const Campaign = (props) => {
    const { name, desc, id } = props.campaign

    return (
        <div className="campaign-card">
            <h2>{name}</h2>
            <h3>{desc}</h3>
            <Link to={`/campaign/${id}`}>More</Link>
        </div>
    )
}

export default Campaign