import axios from 'axios'

export default async function shuffle(deviceId: string | null, state: boolean) {
    return await axios.put(
        `http://localhost:5000/player/shuffle`,
        {},
        {
            params: { deviceId, state },
            withCredentials: true,
        }
    )
}
