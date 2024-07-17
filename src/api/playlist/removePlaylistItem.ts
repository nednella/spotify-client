import axios from 'axios'

export default async function removePlaylistItem(id: string, uri: string) {
    console.log(id, uri)
    return await axios.delete(`http://localhost:5000/api/playlist/tracks/`, {
        params: { id, uri },
        withCredentials: true,
    })
}
