import { useQuery } from '@tanstack/react-query'

import getBrowseCategories from '../api/browse/getBrowseCategories'

const useGetBrowseCategories = () => {
    return useQuery({
        queryKey: ['browse'],
        queryFn: async () => getBrowseCategories(),
        staleTime: 600000, // 1000 * 60 * 10 minutes
    })
}

export default useGetBrowseCategories
