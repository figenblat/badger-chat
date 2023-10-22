import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';



export default function BadgerRegister() {
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
      });
    
      const [alertMessage, setAlertMessage] = useState('');
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleRegistration = () => {
        const { username, password, confirmPassword } = formData;
    
        if (!username || !password) {
          setAlertMessage('You must provide both a username and password!');
          return;
        }
    
        if (password !== confirmPassword) {
          setAlertMessage('Your passwords do not match!');
          return;
        }

        fetch('https://cs571.org/api/f23/hw6/register', {
          method: 'POST',
          credentials: "include",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
            "X-CS571-ID": CS571.getBadgerId()
          }
        })
          .then((response) => {
            console.log(response.status)
            if (response.status === 200) {
              setAlertMessage('Registration successful!');
              sessionStorage.setItem('isLoggedIn', true);
              sessionStorage.setItem('username', username);
              navigate('/');
              window.location.reload();

            } else if (response.status === 409) {
              setAlertMessage('That username has already been taken!');
            } else {
              setAlertMessage('Registration failed. Please try again.');
            }
          })
          .catch((error) => {
            console.error('Error during registration:', error);
            setAlertMessage('Registration failed. Please try again.');
          });
        };

    return ( <>
        <h1>Register</h1>
        {alertMessage && <div className="alert alert-danger">{alertMessage}</div>}
    <form>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <button type="button" onClick={handleRegistration} className="btn btn-primary">
        Register
      </button>
    </form>
  </>
  );
}