import { useQuery } from '@tanstack/react-query'

import getPlaylist from '../api/playlist/getPlaylist'

import { User } from '../types/User'

const useGetPlaylist = (user: User | null, id: string | undefined) => {
    return useQuery({
        queryKey: ['playlist', id],
        queryFn: async () => getPlaylist(id),
        enabled: user !== null && id !== null,
        staleTime: 600000, // 1000 * 60 * 10 minutes
    })
}

export default useGetPlaylist
