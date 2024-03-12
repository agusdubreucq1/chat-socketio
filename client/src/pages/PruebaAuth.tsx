import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import LoginButton from '../components/common/LoginButton';
import LogoutButton from '../components/common/LogoutButton';
// import Profile from './Profile';

import io, { Socket } from 'socket.io-client'

// const socket = io('http://localhost:8080')
// console.log(socket)

const PruebaAuth = () => {


    const [socket, setSocket] = React.useState<null | Socket>(null)
    const { getAccessTokenSilently } = useAuth0()

    useEffect(() => {
        const connect = async () => {
            const token = await getAccessTokenSilently()
            if (!token) return
            const newSocket = io('http://localhost:3000', {
                auth: {
                    token
                }
            })
            setSocket(newSocket)
        }
        connect()
    }, [getAccessTokenSilently])

    useEffect(() => {
        if (!socket) return
        socket.on('msg', (data) => {
            console.log(data)
        })
    }, [socket])

    const access = async () => {
        const token = await getAccessTokenSilently()
        console.log(token)
    }

    const peticion = async () => {
        const token = await getAccessTokenSilently()
        console.log(token)
        const response = await fetch('http://localhost:8080/authorized', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response)
        const data = await response.json()
        console.log(data)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('envio de formulario')
        const formData = new FormData(event.currentTarget)
        // const token = await getAccessTokenSilently()
        const msg = formData.get('msg')
        console.log(msg)
        // socket.emit('msg', { msg, token })
    }
    return (
        <>
            <LoginButton></LoginButton>
            <LogoutButton />
            {/* <Profile></Profile> */}
            <button onClick={peticion}>hacer peticion</button>
            <div onClick={access}>acceder al token</div>
            <form onSubmit={handleSubmit}>
                <input name='msg'></input>
                <button type='submit'>Enviar</button>
            </form>
        </>
    )
}

export default PruebaAuth