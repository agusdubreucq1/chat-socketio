import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import Profile from '../components/Profile';

// import io from 'socket.io-client'

// const socket = io('http://localhost:8080')
// console.log(socket)

const PruebaAuth = () => {

    const { getAccessTokenSilently } = useAuth0()

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
            <Profile></Profile>
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