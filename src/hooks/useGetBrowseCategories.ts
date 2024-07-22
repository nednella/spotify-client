import { useQuery } from '@tanstack/react-query'

import getBrowseCategories from '../api/search/getBrowseCategories'

import { User } from '../types/User'

const useGetBrowseCategories = (user: User | null) => {
    return useQuery({
        queryKey: ['browse'],
        queryFn: async () => getBrowseCategories(),
        enabled: user !== null,
        staleTime: 600000, // 1000 * 60 * 10 minutes
    })
}

export default useGetBrowseCategories
