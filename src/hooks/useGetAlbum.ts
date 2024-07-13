import { useQuery } from '@tanstack/react-query'

import getAlbum from '../api/album/getAlbum'

import { User } from '../types/User'

const useGetAlbum = (user: User | null, id: string | undefined) => {
    return useQuery({
        queryKey: ['album', id],
        queryFn: async () => getAlbum(id),
        enabled: user !== null && id !== null,
        staleTime: 600000, // 1000 * 60 * 10 minutes
    })
}

export default useGetAlbum
