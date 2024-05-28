import axios from 'axios'
import toast from 'react-hot-toast'

async function RetrieveTokens(authCode: string) {
    // Get spotify auth tokens
    return await axios
        .post('http://localhost:5000/auth/authorise', { code: authCode }, { withCredentials: true })
        .catch((error) => {
            throw error
        })
}

export default async function Authorise() {
    const authCode = new URLSearchParams(window.location.search).get('code')
    if (authCode) {
        await toast.promise(RetrieveTokens(authCode), {
            loading: 'Connecting...',
            success: 'Logged in',
            error: (error) => {
                if (!error.response) {
                    return error.message // server error
                } else {
                    return error.response.data // spotify api error
                }
            },
        })
        return
    } else {
        throw toast.error('No authorisation code')
    }
}
