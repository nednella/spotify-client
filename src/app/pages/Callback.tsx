import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Login } from '../../api/Login'

import Header from '../../components/Header'

const Callback = () => {
    const navigate = useNavigate()

    useEffect(() => {
        Login()
        navigate('/')
    })

    // TODO: add content? maybe a loading spinner

    return (
        <>
            <Header />
        </>
    )
}

export default Callback
