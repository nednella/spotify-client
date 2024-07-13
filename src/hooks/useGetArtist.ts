import { useQuery } from '@tanstack/react-query'

import getArtist from '../api/artist/getArtist'

import { User } from '../types/User'

const useGetArtist = (user: User | null, id: string | undefined) => {
    return useQuery({
        queryKey: ['artist', id],
        queryFn: async () => getArtist(id),
        enabled: user !== null && id !== null,
        staleTime: 600000, // 1000 * 60 * 10 minutes
    })
}

export default useGetArtist
