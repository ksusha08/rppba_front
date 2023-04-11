import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
import { Modal, Table } from "react-bootstrap";



export default function AddDocument() {

  let navigate=useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);


  const [document,setDocument]= useState({
    number:"",
    date:"",
    status:"не проведен",
    type:"",
    id_user: JSON.parse(localStorage.getItem('user')).id,
    id_provider:""
  });

  const{number,date,status,type,id_user,id_provider}=document

  const onInputChange= async (e)=>{

   setDocument({...document,[e.target.name]:e.target.value});

  };

  const onSubmit= async (e)=>{

    e.preventDefault();
    await axios.post("http://localhost:8080/document",document);
    navigate("/documents");

  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      const { data } = await axios.get("http://localhost:8080/suppliers");
      setSuppliers(data);
    };
    fetchSuppliers();
  }, []);

  const handleSelectSupplier = (selectedSupplier) => {
    setDocument({ ...document, id_provider: selectedSupplier.id });
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="row" >
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

          <h2 className="text-center m-4">Добавить документ</h2>


          <form onSubmit={(e)=>onSubmit(e)}>

          <div className="mb-3">
            <label htmFor="Number" className="form-label">Номер</label>
            <input
              type={"text"}
              class="form-control"
              placeholder="Введите номер"
              name="number" 
              value={number}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

          <div className="mb-3">
            <label htmFor="Date" className="form-label">Дата</label>
            <input type={"date"}
              className="form-control"
              placeholder="Выберите дату артикул"
              name="date" 
              value={date}
              onChange={(e)=>onInputChange(e)}
              />
          </div>


          <div className="mb-3">
              <label htmlFor="Type" className="form-label">Тип</label>
              <select
                className="form-control"
                name="type"
                value={type}
                onChange={(e)=>onInputChange(e)}
              >
                <option value="">Выберите тип</option>
                <option value="приход">Приход</option>
                <option value="расход">Расход</option>
              </select>
            </div>

          <div className="mb-3">
          <label htmlFor="id_provider" className="form-label">
            Поставщик
          </label>
          <input
            type={"text"}
            className="form-control"
            placeholder="Выберите поставщика"
            name="id_provider"
            value={id_provider}
            onClick={() => setShowModal(true)}
          />
        </div>

          <button type="submit" className="btn btn-outline-dark">Добавить</button>
          <Link  className="btn btn-outline-danger mx-2" to ="/documents">Отмена</Link>
          </form>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Выберите поставщика</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Почта</th>
                <th>Адрес</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.id}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.address}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleSelectSupplier(supplier)}
                    >
                      Выбрать
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
        </div>
      </div>
    </div>
  )
}
