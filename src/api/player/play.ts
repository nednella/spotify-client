import axios from 'axios'

export default async function play(deviceId: string | null, contextUri?: string, offset?: number) {
    console.log(deviceId, contextUri, offset)
    return await axios.put(
        `http://localhost:5000/player/play`,
        {},
        {
            params: { deviceId, contextUri, offset },
            withCredentials: true,
        }
    )
}
