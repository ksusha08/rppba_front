import React from "react";
import { Link } from "react-router-dom";
import '../styles/style.css';
import '../App.css';

export default function AdminMenu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/activeusers" className="nav-link">
                Пользователи
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/applications" className="nav-link">
                Заявки
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/bannedusers" className="nav-link">
                Черный список
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}