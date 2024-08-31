import { useQuery } from '@tanstack/react-query'

import getSearchTracks from '../api/browse/getSearchTracks'

const useGetSearchTracks = (query: string | undefined) => {
    return useQuery({
        queryKey: ['search', 'tracks', query],
        queryFn: async () => getSearchTracks(query!),
        enabled: query !== undefined && query !== '',
        staleTime: 600000, // 1000 * 60 * 10 minutes
    })
}

export default useGetSearchTracks
