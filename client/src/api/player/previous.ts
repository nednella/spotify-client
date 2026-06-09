import axios from 'axios'

export default async function previous(deviceId: string | null) {
    return await axios.post(
        `http://localhost:5000/player/previous`,
        {},
        {
            params: { deviceId },
            withCredentials: true,
        }
    )
}
