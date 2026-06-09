import { useQuery } from '@tanstack/react-query'

import getFeaturedPlaylists from '../api/browse/getFeaturedPlaylists'

import { User } from '../types/User'

const useGetFeaturedPlaylists = (user: User | null) => {
    return useQuery({
        queryKey: ['playlist', 'featured'],
        queryFn: async () => getFeaturedPlaylists(),
        enabled: user !== null,
        staleTime: 600000, // 1000 * 60 * 10 minutes
    })
}

export default useGetFeaturedPlaylists
