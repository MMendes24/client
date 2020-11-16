import React from "react"

const Campaign = (props) => {
    const { name, desc } = props.campaign
    
    return (
        <div>
            <h2>{name}</h2>
            <h3>{desc}</h3>
        </div>
    )
}

export default Campaign