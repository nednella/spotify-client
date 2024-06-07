import axios from 'axios'
import toast from 'react-hot-toast'

export default async function Logout() {
    return await axios
        .get('http://localhost:5000/auth/logout', { withCredentials: true })
        .then((response) => {
            return toast.success(response.data)
        })
        .catch((error) => {
            if (!error.response) {
                toast.error(error.message) // network error
            } else {
                toast.error(error.response.data) // server error
            }
        })
}
