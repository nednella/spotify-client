import axios from 'axios'

export default async function next(deviceId: string | null) {
    return await axios.post(
        `http://localhost:5000/player/next`,
        {},
        {
            params: { deviceId },
            withCredentials: true,
        }
    )
}
