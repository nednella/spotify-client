import axios from 'axios'

export default async function setActiveDevice(deviceId: string) {
    return await axios.put(
        `http://localhost:5000/player/devices`,
        {},
        {
            params: { deviceId },
            withCredentials: true,
        }
    )
}
