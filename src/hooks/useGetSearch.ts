import { useQuery } from '@tanstack/react-query'

import getSearch from '../api/browse/getSearch'

const useGetPlaylist = (query: string | undefined) => {
    return useQuery({
        queryKey: ['search', query],
        queryFn: async () => getSearch(encodeURIComponent(query!)),
        enabled: query !== undefined && query !== '',
        staleTime: 600000, // 1000 * 60 * 10 minutes
    })
}

export default useGetPlaylist
