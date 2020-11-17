import axios from 'axios'

const axiosAuth = () => {
    return axios.create({
        baseURL: "https://campaign-journal-api.herokuapp.com/api",
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
}

export default axiosAuth 

