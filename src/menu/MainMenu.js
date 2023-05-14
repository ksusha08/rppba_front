
import React from "react";
import { Link } from "react-router-dom";
import '../styles/menu.css';
import { faBoxesPacking } from "@fortawesome/free-solid-svg-icons";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faDolly } from "@fortawesome/free-solid-svg-icons";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";

export default function AdminMenu() {
  const userRole = JSON.parse(localStorage.getItem("user")).roles;
  return (
    <nav className="nav-style-">
      <div className="menu-style">


        <li className="nav-item">
          <Link to="/suppliers" className="nav-link">
            <FontAwesomeIcon icon={faUsers} />
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/nomenclature" className="nav-link">
            <FontAwesomeIcon icon={faBook} />
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/suppliernomenclature" className="nav-link">
            <FontAwesomeIcon icon={faAddressBook} />
          </Link>
        </li>


        <li className="nav-item">
          <Link to="/items" className="nav-link">
            <FontAwesomeIcon icon={faDolly} />
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/pricerequest" className="nav-link">
            <FontAwesomeIcon icon={faFileInvoiceDollar} />
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/documents" className="nav-link">
            <FontAwesomeIcon icon={faFilePen} />
          </Link>
        </li>


        <li className="nav-item">
          <Link to="/needDoc" className="nav-link">
            <FontAwesomeIcon icon={faBoxesPacking} />
          </Link>
        </li>

        {userRole.includes('ADMIN') && (
          <li className="nav-item" data-text="Пользователи">
            <Link to="/home" className="nav-link">
              <FontAwesomeIcon icon={faUserGear} />
            </Link>
          </li>
        )}

      </div>
    </nav>

  );
}