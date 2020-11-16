import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosAuth from "../utils/axiosAuth"

const CampaignInfo = (props) => {
    console.log(props)
    //setting state
    const [worlds, setWorlds] = useState([])
    const [chars, setChars] = useState([])
    const [countries, setCountries] = useState([])

    //grabbing campaign id
    const { id } = useParams()

    const getWorlds = () => {
        axiosAuth()
            .get(`/campaigns/${id}/worlds`)
            .then(res => {
                setWorlds(res.data.worlds)
            })
            .catch(err => {
                console.error("Failed to GET worlds!")
            })
    }

    const getChars = () => {
        axiosAuth()
            .get(`/campaigns/${id}/characters`)
            .then(res => {
                setChars(res.data.characters)
            })
            .catch(err => {
                console.error("Failed to GET characters!")
            })
    }

    const getCountries = () => {
        axiosAuth()
            .get(`/campaigns/${id}/countries`)
            .then(res => {
                setCountries(res.data.countries)
            })
            .catch(err => {
                console.error("Failed to GET countries!")
            })
    }

    useEffect(() => {
        getWorlds()
        getChars()
        getCountries()
    }, [])

    return (
        <div className="campaign-full">
            <section className="camp-sec">

            </section>

            <section className="world-sec">
                {worlds.map(world => (
                    <div className="world-card" key={world.id}>
                        <h3>{world.name}</h3>
                        <p>{world.description}</p>
                    </div>
                ))}
            </section>

            <section className="char-sec">
                {chars.map(char => (
                    <div className="char-card" key={char.id}>
                        <h3>{char.name}</h3>
                        <p>{char.description}</p>
                    </div>
                ))}
            </section>

            <section className="countries-sec">
                {countries.map(country => (
                    <div className="country-card" key={country.id}>
                        <h3>{country.name}</h3>
                        <p>{country.description}</p>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default CampaignInfo