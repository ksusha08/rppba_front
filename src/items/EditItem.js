import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/style.css';
import { useEffect } from 'react';
import { Modal, Table } from "react-bootstrap";

export default function AddItem() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const [nomenclature, setNomeclature] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState(null);

  const [selectedNomenclatureId, setSelectedNomenclatureId] = useState(null);


  useEffect(() => {
    loadItem()
  }, []);


  const loadItem = async () => {
    const result = await axios.get(`http://localhost:8081/item/${id}`);
    setItem(result.data);
  };


  const [item, setItem] = useState({
    description: '',
    discountPrice: '',
    supplierNomenclature: '1'
  });

  const { description, discountPrice } = item;

  const onInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };



  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photos', e.target.photos.files[0]);
    formData.append('item', new Blob([JSON.stringify(item)], {
      type: 'application/json'
    }));
    
    let selectedId = selectedProviderId;
    if (!selectedProviderId) {
      selectedId = item.supplierNomenclature.id;
    }

    console.log(selectedProviderId);
    await axios.put(`http://localhost:8081/item/${id}/${selectedId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    navigate('/items');

  };


  useEffect(() => {
    const fetchNomenclature = async () => {
      const { data } = await axios.get("http://localhost:8081/supplierNomenclature");
      setNomeclature(data);
    };
    fetchNomenclature();
  }, []);





  useEffect(() => {
    const fetchSuppliers = async () => {
      const { data } = await axios.get("http://localhost:8081/supplierNomenclature");
      setSuppliers(data);
    };
    fetchSuppliers();
  }, []);

  const handleSelectSupplier = (selectedSupplier) => {
    setSelectedProviderId(selectedSupplier.id);
    setShowModal(false);
  };

  return (
    <div className='container mainFon'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Изменить товар</h2>

          <form onSubmit={(e) => onSubmit(e)} enctype="multipart/form-data">

            <div className="mb-3">
              <label htmlFor="id_provider" className="form-label">
                Номенклатура поставщика
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Выберите номенклатуру поставщика"
                  value={
                    selectedProviderId
                      ? suppliers.find((s) => s.id === selectedProviderId)
                        .supplier.name
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



            <div className='mb-3'>
              <label htmlFor='Description' className='form-label'>
                Описание
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Введите описание'
                name='description'
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='Price' className='form-label'>
                Цена
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Введите цену'
                name='discountPrice'
                value={discountPrice}
                onChange={(e) => onInputChange(e)}
              />
            </div>


            <div className="mb-3">
              <label htmlFor="photos" className="form-label">
                Изображение товара
              </label>
              <input
                type="file"
                className="form-control"
                id="photos"
                name="photos"
                accept=".jpg,.png,.jpeg"
              />
            </div>



            <div className='d-flex justify-content-between align-items-center'>
              <Link to='/items' className='btn btn-danger'>
                Назад
              </Link>
              <button type='submit' className='btn btn-primary'>
                Изменить
              </button>
            </div>
          </form>


          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Выберите номенклатуру поставщика</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th scope="col">ИД</th>
                    <th scope="col">Поставщик</th>
                    <th scope="col">Номенклатура</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr
                      key={supplier.id}
                      onClick={() => handleSelectSupplier(supplier)}
                    >
                      <td>{supplier.id}</td>
                      <td>{supplier.supplier.name}</td>
                      <td>{supplier.nomenclature.name}</td>

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