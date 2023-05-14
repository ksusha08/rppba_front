import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate,useParams } from "react-router-dom";
import { Modal, Table } from "react-bootstrap";

export default function EditPriceRequest() {
  let navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState(null);

  const { id } = useParams()

  const [document, setDocument] = useState({
  
    date: "",
    status: "отправлен",
  
  });

  const { number, date, status, type } = document;

  const onInputChange = async (e) => {
    setDocument({ ...document, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProviderId) {
      alert("Выберите поставщика");
      return;
    }
    
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const supplierId = selectedProviderId;
    await axios.put(`http://localhost:8081/priceRequest/${id}/${supplierId}`, document);
    navigate("/pricerequest");
  };

  const loadDocuments = async () => {
    const result = await axios.get("http://localhost:8081/priceRequest");
    setDocuments(result.data);
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      const { data } = await axios.get("http://localhost:8081/suppliers");
      setSuppliers(data);
    };
    fetchSuppliers();
  }, []);

  const handleSelectSupplier = (selectedSupplier) => {
    setSelectedProviderId(selectedSupplier.id);
    setShowModal(false);
  };

  return (
    <div className="container mainFon">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Добавить документ</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            

            <div className="mb-3">
              <label htmFor="Date" className="form-label">
                Дата поставки
              </label>
              <input
                type={"date"}
                className="form-control"
                placeholder="Выберите дату артикул"
                name="date"
                value={date}
                onChange={(e) => onInputChange(e)}
              />
            </div>


            <div className="mb-3">
              <label htmlFor="id_provider" className="form-label">
                Поставщик
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Выберите номенклатуру поставщика"
                  value={
                    selectedProviderId
                      ? suppliers.find((s) => s.id === selectedProviderId)
                        .name
                      : ""
                  }
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Выбрать
                </button>
              </div>
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary me-2">
                Сохранить
              </button>
              <Link to="/pricerequest" className="btn btn-secondary">
                Отмена
              </Link>
            </div>
          </form>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Выберите поставщика</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Название</th>
                    <th>Адрес</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr
                      key={supplier.id}
                      onClick={() => handleSelectSupplier(supplier)}
                    >
                      <td>{supplier.id}</td>
                      <td>{supplier.name}</td>
                      <td>{supplier.address}</td>
                      <td>{supplier.email}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>

  );
}