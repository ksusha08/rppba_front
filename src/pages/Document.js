import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Menu from "./Menu";

export default function Documents() {
  const [documents, setDocuments] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const result = await axios.get("http://localhost:8080/documents");
    setDocuments(result.data);
  };

  const deleteDocument = async (id) => {
    await axios.delete(`http://localhost:8080/document/${id}`);
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
      <div className="py-4 d-flex justify-content-end">
        <table className="table border shadow">
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
                <td>{document.date}</td>
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