import { useQuery } from '@tanstack/react-query'

import { User } from '../types/User'
import getGenre from '../api/browse/getGenre'

const useGetBrowseCategories = (user: User | null, id: string | undefined) => {
    return useQuery({
        queryKey: ['genre', id],
        queryFn: async () => getGenre(id),
        enabled: user !== null && id !== null,
        staleTime: 600000, // 1000 * 60 * 10 minutes
    })
}

export default useGetBrowseCategories
