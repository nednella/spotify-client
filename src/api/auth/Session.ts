import axios from 'axios'

export default async function getSession() {
    return await axios
        .get('http://localhost:5000/', { withCredentials: true })
        .then((response) => {
            return response.data
        })
        .catch(() => {
            return null // if server error, return null
        })
}
