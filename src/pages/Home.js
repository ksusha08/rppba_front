import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Menu from "./Menu";

export default function Home() {
  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`);
    loadUsers();
  };

  return (
    <div>
      <Link
                    className="btn btn-dark ml-0 "
                    to={`/adduser`}
                    style={{ float: "right" }}
                  >
                    Добавить пользователя
                  </Link>
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">№</th>
              <th scope="col">Логин</th>
              <th scope="col">Роль</th>
              <th scope="col">Действие</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.username}</td>
                <td>{user.roles}</td>
                <td>
                  <Link
                    className="btn btn-dark mx-2"
                    to={`/viewuser/${user.id}`}
                  >
                    Просмотреть
                  </Link>
                  <Link
                    className="btn btn-outline-dark mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Редактировать
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}