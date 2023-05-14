import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "../pages/Menu";
import '../styles/style.css';

export default function OpenDocument() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const { id} = useParams();

  const [amount, setAmount] = useState('');
  const [documentInfo, setDocumentInfo] = useState([]);

  const [priceRequestInfo, setPriceRequestInfo] = useState([]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const loadItems = async () => {
    
    const result = await axios.get(`http://localhost:8081/supplierNomenclatureBySupplier/${id}`);
    setItems(result.data);
  };

  useEffect(() => {
    loadDocumentInfo();
    loadItems();
  }, []);

  const loadDocumentInfo = async () => {
    const result = await axios.get(`http://localhost:8081/priceRequestInfo/findByPriceRequestId/${id}`);
    setPriceRequestInfo(result.data);
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDocumentInfo = {
      amount
    };

    const result = await axios.post(
      `http://localhost:8081/priceRequestInfo/${id}/${selectedItem.id}/`,
      newDocumentInfo
    );
    setSelectedItem(null);
    setAmount("");

    loadItems();
    loadDocumentInfo();
  };


  const deleteInfo = async (id) => {
    await axios.delete(`http://localhost:8081/priceRequestInfo/${id}`);
    loadDocumentInfo();
  };

  return (
    <div className="mainFon">
      <Link
        className="btn btn-dark ml-0 "
        to={`/pricerequest`}
        style={{ float: "right" }}
      >
        Назад
      </Link>


      <div className="row" style={{ marginTop: '30px' }}>


        <div className="col-md-6">

          <div className="container">
            <h3>Номенклатуры поставщика</h3>

            <div className="container">


              <div className="d-flex justify-content-between mb-3" >
                <div className='mb-3'>
                  <label htmlFor="vendoreCode">Название:</label>
                  <input
                    type="text"
                    id="vendoreCode"
                    name="vendoreCode"
                    className="form-control"
                    value={selectedItem ? selectedItem.nomenclature.name : ""}
                    readOnly
                  />
                </div>
               
                <div className='mb-3'>
                  <label htmlFor="number">Количество:</label>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    className="form-control"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </div>

                <button type='submit' className='btn btn-dark  custom-height' onClick={handleSubmit}
                  disabled={!selectedItem || !amount} >
                  Добавить
                </button>

              </div>



            </div>
            <div className="table-wrapper-scroll-y my-custom-scrollbar">
              <div className="py-4 d-flex justify-content-end">
                <table className="table border shadow">
                  <thead>
                    <tr>
                      <th scope="col">ИД</th>
                      <th scope="col">Название</th>
                      <th scope="col">Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.nomenclature.name}</td>
                    
                        <td>
                          <button
                            className="btn btn-dark ml-0"
                            onClick={() => {
                              setSelectedItem(item);
                              document.getElementById("vendoreCode").value = item.vendoreCode;
                              document.getElementById("discountPrice").value = item.discountPrice;
                            }}
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

        <div className="col-md-6">
          <div className="container">
            <h3>Содержимое заявки</h3>
            <div className="table-wrapper-scroll-y my-custom-scrollbar">
              <div className="py-4 d-flex justify-content-end">
                <table className="table border shadow">
                  <thead>
                    <tr>
                      <th scope="col">Название</th>
                      <th scope="col">Количество</th>
                      <th scope="col">Действие</th>
                    </tr>
                  </thead>
                  <tbody>

                    {priceRequestInfo.map((info, index) => (
                      <tr key={index}>

                        <td>{info.supplierNomenclature.nomenclature.name}</td>
                        <td>{info.amount}</td>
                       

                        <td>
                          <button
                            className="btn btn-outline-dark"
                            onClick={() => deleteInfo(info.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
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



      </div>
    </div>
  );
}