import axios from 'axios'

export default async function volume(deviceId: string | null, volume: number) {
    return await axios.put(
        `http://localhost:5000/player/volume`,
        {},
        {
            params: { deviceId, volume },
            withCredentials: true,
        }
    )
}
