import axios from 'axios'
import toast from 'react-hot-toast'

export default async function Login() {
    // Redirect to spotify auth URL
    return axios
        .get('http://localhost:5000/authorise')
        .then((response) => window.location.replace(response.data))
        .catch((error) => toast.error(error.message))
}
