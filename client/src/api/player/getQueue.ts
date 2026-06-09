import axios from 'axios'
import toast from 'react-hot-toast'

export default async function getQueue() {
    try {
        const response = await axios.get(`http://localhost:5000/player/queue`, { withCredentials: true })
        const { data } = response
        return data
    } catch (err) {
        // 400 - Invalid base62 ID
        // 404 - Resource not found
        // 401 - Bad or expired token (should never happen due to auto refresh)
        // 403 - Bad OAuth request (wrong consumer key, bad nonce, expired timestamp). Re-auth wont help
        // 429 - Rate limit

        if (axios.isAxiosError(err)) {
            if (err.response) {
                // Server responded with a status code outside 2xx range.
                toast.error(err.response.data)
            } else if (err.request) {
                // Request made but no server response received.
                console.error('No response received:', err.request)
                toast.error('No response received.')
            } else {
                // Something happened in setting up the request that triggered an Error.
                console.error('Error:', err.message)
                toast.error('There was an error with your request.')
            }
        } else {
            // Unexpected error.
            console.error('Unexpected error:', err)
        }
    }
}
