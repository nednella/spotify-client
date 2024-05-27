import axios from 'axios'
import toast from 'react-hot-toast'

export default async function Logout() {
    return await axios
        .get('http://localhost:5000/logout', { withCredentials: true })
        .then((response) => {
            return toast.success(response.data)
        })
        .catch((error) => {
            if (!error.response) {
                throw new Error(error.message) // network error
            } else {
                throw new Error(error.response.data) // server error
            }
        })
}
