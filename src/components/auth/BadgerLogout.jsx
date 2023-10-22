
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BadgerLogout() {
    const navigate = useNavigate();
   

    useEffect(() => {
        fetch('https://cs571.org/api/f23/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            // Maybe you need to do something here?
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('username');
            sessionStorage.setItem('isLoggedIn', false)
            alert("You have been sucessfully logged out!")
            navigate('/')
            window.location.reload();
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
