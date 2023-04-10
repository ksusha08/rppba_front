import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/suppliers" className="nav-link">
                Справочник поставщиков
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/items" className="nav-link">
                Справочник товаров
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/documents" className="nav-link">
                Документ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}