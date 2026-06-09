import axios from 'axios'

export default async function getSession() {
    return await axios
        .get('http://localhost:5000/auth/session', { withCredentials: true })
        .then((response) => {
            return response.data
        })
        .catch(() => {
            return null // if session does not exist, return null
        })
}
