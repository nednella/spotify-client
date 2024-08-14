import axios from 'axios'

export default async function repeat(deviceId: string | null, state: 'off' | 'context' | 'track') {
    return await axios.put(
        `http://localhost:5000/player/repeat`,
        {},
        {
            params: { deviceId, state },
            withCredentials: true,
        }
    )
}
