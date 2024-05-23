import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Authorise from '../../api/Authorise'
import { useSession } from '../../hooks/useSession'

const Callback = () => {
    const navigate = useNavigate()
    const { setSession } = useSession()

    useEffect(() => {
        Authorise()
            .then(() => {
                window.history.pushState({}, '', '/') // clear nav history after successful login
                navigate('/')
                setSession(true) // prevents requiring a page reload
            })
            .catch(() => {
                return navigate('/')
            })
    })
}

export default Callback
