import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {

  let navigate = useNavigate()

  const [user, setUser] = useState({
    name: "",
    surname: "",
    patronymic: "",
    email: "",
    username: "",
    password:"",
    role: ["USER"] 
  });

  const { name, surname,patronymic,email,username, password, role } = user;

  const onInputChange = async (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
   
    user.roles = ["USER"];
    await axios.post("http://localhost:8081/user", user);
    navigate("/home");
  };

  return (
    <div className="container mainFon">
      <div className="row" >
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

          <h2 className="text-center m-4">Добавить пользователя</h2>

          <form onSubmit={(e) => onSubmit(e)}>

            <div className="mb-3">
              <label htmlFor="Name" className="form-label">Имя</label>
              <input
                type={"text"}
                class="form-control"
                placeholder="Введите имя"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Surname" className="form-label">Фамилия</label>
              <input
                type={"text"}
                class="form-control"
                placeholder="Введите фамилию"
                name="surname"
                value={surname}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Patronymic" className="form-label">Отчество</label>
              <input
                type={"text"}
                class="form-control"
                placeholder="Введите отчество"
                name="patronymic"
                value={patronymic}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Email" className="form-label">Почта</label>
              <input type={"text"}
                className="form-control"
                placeholder="Введите почту"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="UserName" className="form-label">Логин</label>
              <input
                type={"text"}
                class="form-control"
                placeholder="Введите имя пользователя"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Password" className="form-label">Пароль</label>
              <input type={"text"}
                className="form-control"
                placeholder="Введите пароль"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>

    
          

            <button type="submit" className="btn btn-outline-dark">Зарегистрировать</button>
            <Link className="btn btn-outline-danger mx-2" to="/home">Отмена</Link>
          </form>
        </div>
      </div>
    </div>
  )
}