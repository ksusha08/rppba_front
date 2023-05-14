import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Menu from "./Menu";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { faFileCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function Need() {
  const [need, setNomeclature] = useState([]);
  const [documentInfo, setDocumentInfo] = useState([]);
  const [isAllZero, setIsAllZero] = useState(false);


  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadNomenclature();
    loadDocumentInfo();
  }, []);

  useEffect(() => {
    if (documentInfo.length > 0) {
      const allZero = documentInfo.every(object => object.amount - object.nomenclature.number <= 0);
      setIsAllZero(allZero);
    }
  }, [documentInfo]);


  const loadNomenclature = async () => {
    const result = await axios.get("http://localhost:8081/needs");
    setNomeclature(result.data);
  };

  const loadDocumentInfo = async () => {
    const result = await axios.get(`http://localhost:8081/needDocInfo/findByDocId/${id}`);
    setDocumentInfo(result.data);
  };

  const deleteNomenclature = async (id) => {
    await axios.delete(`http://localhost:8081/need/${id}`);
    loadNomenclature();
  };

  const sendDocToSupplier = async (id) => {
    await axios.post(`http://localhost:8081/sendDoc/${id}`);
    navigate("/needDoc")

  };

  return (
    <div className="mainFon">
      <Link
        className="btn btn-dark ml-0 "
        to={`/needDoc`}
        style={{ float: "right" }}
      >
        Назад
      </Link>


      <div className="container">
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
          <div className="py-4 d-flex justify-content-end">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">На складе</th>
                  <th scope="col">Заявка</th>
                  <th scope="col">Заказать</th>

                </tr>
              </thead>
              <tbody>
                {documentInfo.map((object, index) => (
                  <tr>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>{object.nomenclature.name}</td>
                    <td>{object.nomenclature.number}</td>
                    <td>{object.amount}</td>
                    <td>
                      {object.amount - object.nomenclature.number < 0
                        ? 0
                        : object.amount - object.nomenclature.number
                      }</td>

                  </tr>
                ))}
              </tbody>
            </table>

          </div>
          {isAllZero && (
            <button
              className="btn btn-dark mx-2"
              onClick={() => sendDocToSupplier(id)}
            >
              Отправить
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
