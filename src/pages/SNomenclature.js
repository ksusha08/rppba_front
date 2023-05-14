import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import MainMenu from "../menu/MainMenu";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SNomenclature() {
  const [supplierNomenclature, setSupplierNomenclature] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadSupplierNomenclature();
  }, []);

  const loadSupplierNomenclature = async () => {
    const result = await axios.get("http://localhost:8081/supplierNomenclature");
    setSupplierNomenclature(result.data);
  };

  const deleteSupplierNomenclature = async (id) => {
    await axios.delete(`http://localhost:8081/supplierNomenclature/${id}`);
    loadSupplierNomenclature();
  };

  return (
    <div className="mainFon">
      <MainMenu />



      <div className="container">
      <h1 >Номенклатуры поставщиков</h1>
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
          <div className="py-4 d-flex justify-content-end">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">ИД</th>
                  <th scope="col">Поставщик</th>
                  <th scope="col">Номенклатура</th>
                  <th scope="col">
                    <Link
                      className="btn btn-dark ml-0 "
                      to={`/addsuppliernomenclature`}
                      style={{ float: "right" }}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Link>
                    Действие</th>
                </tr>
              </thead>
              <tbody>
                {supplierNomenclature.map((supplierNomenclature, index) => (
                  <tr>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>{supplierNomenclature.supplier.name}</td>
                    <td>{supplierNomenclature.nomenclature.name}</td>
                    <td>
                      <Link
                        className="btn btn-outline-dark mx-2"
                        to={`/editsuppliernomenclature/${supplierNomenclature.id}`}
                      >
                        <FontAwesomeIcon icon={faUserPen} />
                      </Link>
                      <button
                        className="btn btn-dark mx-2"
                        onClick={() => deleteSupplierNomenclature(supplierNomenclature.id)}
                      >
                        <FontAwesomeIcon icon={faUserMinus} />
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