import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Menu from "../pages/Menu";

export default function OpenDocument() {
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedName, setSelectedName] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const result = await axios.get("http://localhost:8081/items");
    setItems(result.data);
  };

  const deleteItem = async (id) => {
    const selectedItem = items.find(item => item.id === id);
    setSelectedItem(selectedItem);
    setSelectedName(selectedItem.name);
    setSelectedPrice(selectedItem.discountPrice);
    loadItems();
  };

  const handleSelectItem = () => {
    // TODO: сохранить выбранный товар
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
          
          <div className="d-flex justify-content-between mb-3">
            <div className='mb-3'>
              <label htmlFor="name">Название:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={selectedName}
                className="form-control"
                readOnly
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="price">Цена:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={selectedPrice}
                className="form-control"
                readOnly
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="price">Количество:</label>
              <input
                type="text"
                id="number"
                name="number"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
        
      </div>




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
                  <th scope="col">Количесвто</th>
                  <th scope="col">Изображение</th>
                  <th scope="col">Действие</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.vendoreCode}</td>
                    <td>{item.description}</td>
                    <td>{item.discountPrice}</td>
                    <td>{item.number}</td>
                    <td>
                      {item.photos && (
                        <img
                          src={`http://localhost:8081${item.photosImagePath}`}
                          alt={item.name}
                          height="50"
                        />
                      )}
                    </td>
                    <td>
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