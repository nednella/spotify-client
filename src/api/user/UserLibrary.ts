import axios from 'axios'

export default async function userLibrary() {
    return await axios
        .get('http://localhost:5000/api/user/library', { withCredentials: true })
        .catch((error) => {
            throw error
        })
}
