import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import MainMenu from "../menu/MainMenu";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { faFileCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Nomenclature() {
  const [nomenclature, setNomeclature] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadNomenclature();
  }, []);

  const loadNomenclature = async () => {
    const result = await axios.get("http://localhost:8081/nomenclatures");
    setNomeclature(result.data);
  };

  const deleteNomenclature = async (id) => {
    await axios.delete(`http://localhost:8081/nomenclature/${id}`);
    loadNomenclature();
  };

  return (
    <div className="mainFon">
<MainMenu />


      <div className="container">
      <h1 >Номенклатуры</h1>
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
          <div className="py-4 d-flex justify-content-end">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">ИД</th>
                  <th scope="col">Название</th>
                  <th scope="col">Ед. Измерения</th>
                  <th scope="col">Количество</th>
                  <th scope="col">
                    <Link
                      className="btn btn-dark ml-0 "
                      to={`/addnomenclature`}
                      style={{ float: "right" }}
                    >
                       <FontAwesomeIcon icon={faPlus} />
                    </Link>
                    Действие</th>
                </tr>
              </thead>
              <tbody>
                {nomenclature.map((object, index) => (
                  <tr>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>{object.name}</td>
                    <td>{object.unit}</td>
                    <td>{object.number}</td>
                    <td>
                      <Link
                        className="btn btn-outline-dark mx-2"
                        to={`/editnomenclature/${object.id}`}
                      >
                        <FontAwesomeIcon icon={faFilePen} />
                      </Link>
                      <button
                        className="btn btn-dark mx-2"
                        onClick={() => deleteNomenclature(object.id)}
                      >
                        <FontAwesomeIcon icon={faFileCircleMinus} />
                      </button>
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