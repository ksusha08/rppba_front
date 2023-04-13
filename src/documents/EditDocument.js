import React, {useEffect,useState} from 'react';
import axios from "axios";
import {Link,useNavigate,useParams} from "react-router-dom";
import { Modal, Table } from "react-bootstrap";

export default function EditDocument() {

  let navigate=useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const {id} = useParams()

  const [document,setDocument]= useState({
    number:"",
    date:"",
    status:"",
    type:"",
    id_provider:""
  });

  const{number,date,status,type,id_provider}=document

  const onInputChange= async (e)=>{

    setDocument({...document,[e.target.name]:e.target.value});

  };

  useEffect(()=>{
    loadDocument()
  }, []);

  const onSubmit= async (e)=>{

    e.preventDefault();
    await axios.put(`http://localhost:8080/document/${id}`,document);
    navigate("/documents");

  };

  const loadDocument = async ()=>{
    const result = await axios.get(`http://localhost:8080/document/${id}`);
    setDocument(result.data);
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

          <h2 className="text-center m-4">Редактировать документ</h2>


          <form onSubmit={(e)=>onSubmit(e)}>

          <div className="mb-3">
            <label htmFor="number" className="form-label">Номер</label>
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
            <label htmFor="date" className="form-label">Дата</label>
            <input type={"date"}
              className="form-control"
              placeholder="Введите дату"
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

          <button type="submit" className="btn btn-outline-dark">Редактировать</button>
          <Link  className="btn btn-outline-danger mx-2" to ="/documents">Отмена</Link>
          </form>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Выберите поставщика</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="table-wrapper-scroll-y my-custom-scrollbar2">
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
          </div>
        </Modal.Body>
      </Modal>
        </div>
      </div>
    </div>
  )
}