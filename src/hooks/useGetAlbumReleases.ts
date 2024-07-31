import { useQuery } from '@tanstack/react-query'

import getAlbumReleases from '../api/browse/getAlbumReleases'

import { User } from '../types/User'

const useGetAlbumReleases = (user: User | null) => {
    return useQuery({
        queryKey: ['album', 'releases'],
        queryFn: async () => getAlbumReleases(),
        enabled: user !== null,
        staleTime: 600000, // 1000 * 60 * 10 minutes
    })
}

export default useGetAlbumReleases
