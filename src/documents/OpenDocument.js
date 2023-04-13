import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Menu from "../pages/Menu";

export default function OpenDocument() {
  const [items, setItems] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const result = await axios.get("http://localhost:8080/items");
    setItems(result.data);
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:8080/item/${id}`);
    loadItems();
  };

  return (
    <div>
    
     <Link
        className="btn btn-dark ml-0 "
        to={`/documents`}
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
                <th scope="col">ИД</th>
                <th scope="col">Название</th>
                <th scope="col">Артикул</th>
                <th scope="col">Описание</th>
                <th scope="col">Цена</th>
                <th scope="col">Действие</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{item.name}</td>
                  <td>{item.vendoreCode}</td>
                  <td>{item.description}</td>
                  <td>{item.discountPrice}</td>
                  <td>
                    <Link
                      className="btn btn-outline-dark mx-2"
                      to={`/edititem/${item.id}`}
                    >
                      Редактировать
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteItem(item.id)}
                    >
                      Удалить
                    </button>
                    <button
                      className="btn btn-dark ml-0"
                      onClick={() => deleteItem(item.id)}
                    >
                      Выбрать
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