import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axiosAuth from "../utils/axiosAuth"

const CampaignInfo = (props) => {
    //setting state
    const [camp, setCamp] = useState([])
    const [worlds, setWorlds] = useState([])
    const [chars, setChars] = useState([])
    const [countries, setCountries] = useState([])

    //grabbing campaign id
    const { id } = useParams()

    const getCamps = () => {
        axiosAuth().get(`campaigns/${id}`)
            .then(res => {
                setCamp(res.data.campaigns)
            })
            .catch(err => {
                console.log("didn't work")
            })
    }

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
        getCamps()
        getWorlds()
        getChars()
        getCountries()
    }, [])

    return (
        <div className="campaign-full">
            <section className="camp-sec">
                <h1>Campaign</h1>
                <h3>{camp.name}</h3>
                <h3>{camp.desc}</h3>
                <Link to={`/campaign/${id}/edit`}>Edit</Link>
                <button>Delete</button>
            </section>

            <section className="world-sec">
                <h2>Worlds</h2>
                <Link to={`/campaign/${id}/add-world`}>Create World</Link>
                {worlds.map(world => (
                    <div className="world-card" key={world.id}>
                        <h3>{world.name}</h3>
                        <p>Description: {world.description}</p>
                        <Link to={`/campaign/${id}/worlds/${world.id}/edit-world`}>Edit</Link>
                        <button>Delete</button>
                    </div>
                ))}
            </section>

            <section className="char-sec">
                <h2>Characters</h2>
                <Link to={`/campaign/${id}/add-char`}>Add Character</Link>
                {chars.map(char => (
                    <div className="char-card" key={char.id}>
                        <h3>{char.name}</h3>
                        <p>Description: {char.description}</p>
                        <p>Ancestry: {char.ancestry}</p>
                        <p>Level: {char.level}</p>
                        <p>Class: {char.class}</p>
                        <Link to={`/campaign/${id}/characters/${char.id}/edit-char`}>Edit</Link>
                        <button>Delete</button>
                    </div>
                ))}
            </section>

            <section className="countries-sec">
                <Link to="#">Found Country</Link>
                <h2>Countries</h2>
                {countries.map(country => (
                    <div className="country-card" key={country.id}>
                        <h3>{country.name}</h3>
                        <p>Description: {country.description}</p>
                        <p>Ruler: {country.ruler}</p>
                        <p>Founded: {country.founded}</p>
                        <Link to="#">Edit</Link>
                        <button>Delete</button>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default CampaignInfo