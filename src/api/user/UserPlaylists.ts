import axios from 'axios'

export default async function userPlaylists() {
    return await axios
        .get('http://localhost:5000/api/user/playlists', { withCredentials: true })
        .catch((error) => {
            throw error
        })
}
