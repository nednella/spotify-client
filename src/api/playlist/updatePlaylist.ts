import axios from 'axios'

export default async function updatePlaylist(id: string, name: string, description: string) {
    return await axios.put(
        `http://localhost:5000/api/user/playlists/`,
        {},
        {
            params: { id, name, description },
            withCredentials: true,
        }
    )
}
