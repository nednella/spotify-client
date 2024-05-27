import { useEffect } from 'react'

import { useAuth } from '../../hooks/useAuth'

const Callback = () => {
    const { Login } = useAuth()

    useEffect(() => {
        Login()
    })

    return <></>
}

export default Callback
