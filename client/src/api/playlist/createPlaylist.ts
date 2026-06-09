import axios from 'axios'

export default async function createPlaylist(name: string, description: string) {
    return await axios.post(
        `http://localhost:5000/api/user/playlists`,
        {},
        {
            params: { name: name, description: description },
            withCredentials: true,
        }
    )
}
