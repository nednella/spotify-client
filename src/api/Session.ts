import axios from 'axios'

export default async function checkSession() {
    return await axios
        .get('http://localhost:5000/session', { withCredentials: true })
        .then((response) => {
            return response.data.session
        })
        .catch(() => {
            return false // if server error, return session = false
        })
}
