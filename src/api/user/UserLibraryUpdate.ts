import axios from 'axios'

export default async function updateLibrary(inLibrary: boolean, type: string, id: string) {
    if (inLibrary)
        return await axios.delete(`http://localhost:5000/api/user/library`, {
            params: { type: type, id: id },
            withCredentials: true,
        })
    else
        return await axios.put(
            `http://localhost:5000/api/user/library`,
            {},
            {
                params: { type: type, id: id },
                withCredentials: true,
            }
        )
}
