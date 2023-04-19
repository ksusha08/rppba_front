import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Menu from "./Menu";
import '../styles/style.css';

export default function Documents() {
  const [documents, setDocuments] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const result = await axios.get("http://localhost:8081/documents");
    setDocuments(result.data);
  };

  const deleteDocument = async (id) => {
    await axios.delete(`http://localhost:8081/document/${id}`);
    loadDocuments();
  };

  return (
    <div>
      <Menu />
      <Link
        className="btn btn-dark ml-0 "
        to={`/adddocument`}
        style={{ float: "right" }}
      >
        Создать документ
      </Link>

      <div className="container">
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
          <div className="py-4 d-flex justify-content-end">
            <table className="table border shadow "  >
              <thead>
                <tr>
                  <th scope="col">ИД</th>
                  <th scope="col">Номер</th>
                  <th scope="col">Дата</th>
                  <th scope="col">Статус</th>
                  <th scope="col">Тип</th>
                  <th scope="col">Пользователь</th>
                  <th scope="col">Поставщик</th>
                  <th scope="col">Действие</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document, index) => (
                  <tr>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>{document.number}</td>
                    <td>{new Date(document.date).getDate()}.{new Date(document.date).getMonth() + 1}.{new Date(document.date).getFullYear()}</td>
                    <td>{document.status}</td>
                    <td>{document.type}</td>
                    <td>{document.id_user}</td>
                    <td>{document.id_provider}</td>
                    <td>
                      <Link
                        className="btn btn-outline-dark mx-2"
                        to={`/editdocument/${document.id}`}
                      >
                        Редактировать
                      </Link>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteDocument(document.id)}
                      >
                        Удалить
                      </button>
                      <Link
                        className="btn btn-dark mx-0"
                        to={`/opendocument/${document.id}`}
                      >
                        Открыть
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}