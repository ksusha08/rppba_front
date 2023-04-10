import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';




function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/loginuser', { username, password })
      .then((response) => {

        if (response.data.roles.includes('ADMIN')) {
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/home');
        } else {
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/main');
        } 
      })
      .catch((error) => {
        setError('Данные введены неверно!');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
  <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h2 className="text-center m-4">Авторизация</h2>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">Имя пользователя:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Введите имя пользователя"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Пароль:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Введите пароль"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-outline-dark">Войти</button>
      </div>
    </div>
  </div>
</form>
  );
}

export default Login;