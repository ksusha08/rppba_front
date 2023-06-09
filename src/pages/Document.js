import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import MainMenu from "../menu/MainMenu";
import '../styles/style.css';
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFileCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [status, setStatus] = useState("создан");

  const { id } = useParams();


  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {

    let url = "http://localhost:8081/documents";
    if (status !== "создан") {
      url += `?status=${status}`;
    }
    const result = await axios.get(url);
    setDocuments(result.data);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const deleteDocument = async (id) => {
    await axios.delete(`http://localhost:8081/document/${id}`);
    loadDocuments();
  };

  const updateStatus = async (id) => {
    await axios.post(`http://localhost:8081/reUpdate/${id}/`);
    loadDocuments();
  };

  return (

    <div className="mainFon">
      <MainMenu />
      <h1 >Заказы</h1>

      <div className="container">


        <div className="table-buttons">
          <button
            className={`btn btn-sm ${status === "создан" ? "btn-dark" : "btn-secondary"}`}
            style={{ borderRadius: "0px 10px 0px 0px" }}
            onClick={() => handleStatusChange("создан")}
          >
            Созданные
          </button>
          <button
            className={`btn btn-sm ${status === "получен" ? "btn-dark" : "btn-secondary"}`}
            style={{ borderRadius: "0px 10px 0px 0px" }}
            onClick={() => handleStatusChange("получен")}
          >
            Полученные
          </button>
          <button
            className={`btn btn-sm ${status === "отправлен" ? "btn-dark" : "btn-secondary"}`}
            style={{ borderRadius: "0px 10px 0px 0px" }}
            onClick={() => handleStatusChange("отправлен")}
          >
            Отправленные
          </button>
        </div>

        <div className="table-wrapper-scroll-y my-custom-scrollbar">
          <div className="py-4 d-flex justify-content-end">
            <table className="table border shadow "  >
              <thead>
                <tr>
                  <th scope="col">ИД</th>

                  <th scope="col">Дата</th>
                  <th scope="col">Статус</th>
                  <th scope="col">Пользователь</th>
                  <th scope="col">Поставщик</th>
                  <th scope="col">
                    <Link
                      className="btn btn-dark ml-0 "
                      to={`/adddocument`}
                      style={{ float: "right" }}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Link>
                    Действие</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document, index) => {
                  if (document.status === status) {
                    return (
                      <tr>
                        <th scope="row" key={index}>
                          {index + 1}
                        </th>

                        <td>{new Date(document.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>

                        <td>{document.status}</td>
                        <td>{document.user.name}</td>
                        <td>{document.supplier.name}</td>
                        <td>
                          {document.status == "создан" && (
                            <Link
                              className="btn btn-outline-dark mx-0"
                              to={`/editdocument/${document.id}`}
                            >
                              <FontAwesomeIcon icon={faFilePen} />
                            </Link>
                          )}

                          {document.status !== "отправлен" && (
                            <button
                              className="btn btn-outline-dark mx-2"
                              onClick={() => deleteDocument(document.id)}
                            >
                              <FontAwesomeIcon icon={faFileCircleMinus} />
                            </button>
                          )}

                        
                            <Link
                              className="btn btn-dark mx-0"
                              to={`/opendocument/${document.id}`}
                            >
                              <FontAwesomeIcon icon={faFolderOpen} />
                            </Link>
                        

                          {document.status == "отправлен" && (
                            <button
                              className="btn btn-dark mx-2"
                              onClick={() => updateStatus(document.id)}
                            >
                              Изменить статус
                            </button>
                          )}

                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  );
}