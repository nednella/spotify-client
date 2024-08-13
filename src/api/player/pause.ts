import axios from 'axios'

export default async function pause(deviceId: string | null) {
    return await axios.put(
        `http://localhost:5000/player/pause`,
        {},
        {
            params: { deviceId },
            withCredentials: true,
        }
    )
}
