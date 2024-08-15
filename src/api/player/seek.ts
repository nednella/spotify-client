import axios from 'axios'

export default async function seek(deviceId: string | null, position: number) {
    return await axios.put(
        `http://localhost:5000/player/seek`,
        {},
        {
            params: { deviceId, position },
            withCredentials: true,
        }
    )
}
