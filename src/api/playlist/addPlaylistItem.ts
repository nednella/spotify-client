import axios from 'axios'

export default async function addPlaylistItem(id: string, uri: string) {
    return await axios.post(
        `http://localhost:5000/api/playlist/tracks/`,
        {},
        {
            params: { id, uri },
            withCredentials: true,
        }
    )
}
