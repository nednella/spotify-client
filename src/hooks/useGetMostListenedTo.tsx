import { useQuery } from '@tanstack/react-query'

import getUserTopItems from '../api/user/UserTopItems'

import { User } from '../types/User'

const useGetMostListenedTo = (user: User | null) => {
    return useQuery({
        queryKey: ['most-listened-to'],
        queryFn: async () => getUserTopItems(),
        enabled: user !== null,
        staleTime: 600000, // 1000 * 600 seconds
    })
}

export default useGetMostListenedTo
