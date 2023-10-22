import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



export default function BadgerLogin() {
    const navigate = useNavigate();
   

    // TODO Create the login component.
    const handleLogin = () => {
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
    
        if (!username || !password) {
          alert('You must provide both a username and password!');
          return;
        }
    
        fetch('https://cs571.org/api/f23/hw6/login', {
          method: 'POST',
          credentials: "include",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
            "X-CS571-ID": CS571.getBadgerId()
          },
          //credentials: 'include', // Include cookies for authentication
        })
          .then((response) => {
            if (response.status === 401) {
              alert('Incorrect username or password!');
            } else if (response.status === 200) {
              alert('Login successful!');
              sessionStorage.setItem('isLoggedIn', true);
              sessionStorage.setItem('username', username);
              navigate('/');
              window.location.reload();
            } else {
              alert('Login failed. Please try again.');
            }
          })
          .catch((error) => {
            console.error('Error during login:', error);
            alert('Login failed. Please try again.');
          });

      };
      
    

    return <>
    <div>
        <h1>Login</h1>
        <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="form-control" />
        </div>
        <button type="button" onClick={handleLogin} className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
    </>
}
