import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from "react-router-dom";
import MainMenu from "../menu/MainMenu";
import '../styles/style.css';
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFileCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from 'react-bootstrap';


export default function PriceRequest() {
  const [documents, setDocuments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [status, setStatus] = useState("создан");

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    let url = "http://localhost:8081/priceRequest";
    if (status !== "создан") {
      url += `?status=${status}`;
    }
    const result = await axios.get(url);
    setDocuments(result.data);
  };

  const deleteDocument = async (id) => {
    await axios.delete(`http://localhost:8081/priceRequest/${id}`);
    loadDocuments();
  };

  const updateStatus = async (id) => {
    await axios.post(`http://localhost:8081/sendPriceRequest/${id}/`);
    setModalIsOpen(true);
    loadDocuments();
  };

  const updateStatus2 = async (id) => {
    await axios.post(`http://localhost:8081/updatePriceRequestStatus/${id}/`);
    loadDocuments();
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <div className="mainFon">
      <MainMenu />
      <h1>Запрос цен у поставщиков</h1>



      <div className="container">

        <div className="table-buttons">
          <button
            className={`btn btn-sm ${status === "создан" ? "btn-dark" : "btn-secondary"}`}
            style={{ borderRadius:"0px 10px 0px 0px" }}
            onClick={() => handleStatusChange("создан")}
          >
            Созданные
          </button>
          <button
            className={`btn btn-sm ${status === "получен" ? "btn-dark" : "btn-secondary"}`}
            style={{ borderRadius:"0px 10px 0px 0px" }}
            onClick={() => handleStatusChange("получен")}
          >
            Полученные
          </button>
          <button
            className={`btn btn-sm ${status === "отправлен" ? "btn-dark" : "btn-secondary"}`}
            style={{ borderRadius:"0px 10px 0px 0px" }}
            onClick={() => handleStatusChange("отправлен")}
          >
            Отправленные
          </button>
        </div>

        <div className="table-wrapper-scroll-y my-custom-scrollbar">

          <div className="py-4 d-flex justify-content-end">

            <div>


            </div>

            <table className="table border shadow">

              <thead>
                <tr>
                  <th scope="col">ИД</th>
                  <th scope="col">Дата</th>
                  <th scope="col">Статус</th>
                  <th scope="col">Пользователь</th>
                  <th scope="col">Поставщик</th>
                  <th scope="col">
                    <Link
                      className="btn btn-dark ml-0"
                      to={`/addpricerequest`}
                      style={{ float: "right" }}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Link>
                    Действие
                  </th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document, index) => {
                  if (document.status === status) {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{new Date(document.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                        <td>{document.status}</td>
                        <td>{document.user.name}</td>
                        <td>{document.supplier.name}</td>
                        <td>
                          {document.status !== "получен" && document.status !== "отправлен" && (
                            <Link
                              className="btn btn-outline-dark mx-0"
                              to={`/editpricerequest/${document.id}`}
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
                            to={`/openpricerequest/${document.id}`}
                          >
                            <FontAwesomeIcon icon={faFolderOpen} />
                          </Link>

                          {document.status === "создан" && (
                            <button
                              className="btn btn-dark mx-2"
                              style={{ width: "150px" }}
                              onClick={() => updateStatus(document.id)}
                            >
                              Отправить
                            </button>
                          )}

                          {document.status === "отправлен" && (
                            <button
                              className="btn btn-dark mx-2"
                              style={{ width: "150px" }}
                              onClick={() => updateStatus2(document.id)}
                            >
                              Получить
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
      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Успешная отправка запроса на цены!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы успешно отправили документ с запросом на цены поставщику на почту, пожалуйста ожидайте ответа!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}



