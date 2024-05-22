import axios from 'axios'
import toast from 'react-hot-toast'

async function RetrieveTokens(authCode: string) {
    // Get spotify auth tokens
    return await axios
        .post('http://localhost:5000/login', { code: authCode })
        .catch((error) => {
            // DEBUG
            console.log(error)
            throw error
        })
        .then((response) => {
            // DEBUG
            console.log(response)

            // TODO: Implement sessions
        })
}

export async function Authorise() {
    // Redirect to spotify authorisation URL
    return axios
        .get('http://localhost:5000/authorise')
        .then((response) => window.location.replace(response.data))
        .catch((error) => toast.error(error.message))
}

export function Login() {
    // DEBUG
    // const authCode =
    //     'AQDN8x_EBJu2_g7oGfFwkfiE1aCZG1Rq3iEV4spDfLMTR6xbYTvjVld0n8VIiMdQ2azymw1NuV6cGqngw3y1Y1ohjuVgT3EK70LhOUzVpJM0lS-w_IcP1G_hgS-W8tV3z6TxBaFwuGsKkNo_2UU12bNJ1-QKOEnyyN0GHSbX3zZAHLDLIVRvvKMJMZqHFAoIUWppilYGPnwjtJR7lV4VofPWuNaX1A'

    const authCode = new URLSearchParams(window.location.search).get('code')
    if (authCode) {
        toast.promise(RetrieveTokens(authCode), {
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
    }
}
