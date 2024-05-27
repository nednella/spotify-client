import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Authorise from '../../api/auth/Authorise'

const Callback = () => {
    const navigate = useNavigate()

    useEffect(() => {
        Authorise()
            .then(() => {
                window.history.pushState({}, '', '/') // clear nav history after successful login
                window.location.reload()
                navigate('/')
            })
            .catch(() => {
                return navigate('/')
            })
    })

    return <></>
}

export default Callback
