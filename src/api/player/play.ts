import axios from 'axios'

export default async function play(deviceId: string | null, contextUri?: string, trackUri?: string, offset?: number) {
    return await axios.put(
        `http://localhost:5000/player/play`,
        {},
        {
            params: { deviceId, contextUri, trackUri, offset },
            withCredentials: true,
        }
    )
}
