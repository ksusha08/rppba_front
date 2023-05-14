import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal, Table } from "react-bootstrap";
import '../styles/style.css';

export default function AddDocument() {
    let navigate = useNavigate();
    const { id } = useParams()

    const [suppliers, setSuppliers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProviderId, setSelectedProviderId] = useState(null);

    const [nomenclatures, setNomenclatures] = useState([]);
    const [showModalN, setShowModalN] = useState(false);
    const [selectedNomenclatureId, setSelectedNomenclatureId] = useState(null);

    const [error, setError] = useState('');




    const [sNomenclature, setSNomenclature] = useState({
        supplier: "",
        nomenclature: ""
    });

    const { supplier, nomenclature } = sNomenclature

    const onInputChange = async (e) => {

        setSNomenclature({ ...nomenclature, [e.target.name]: e.target.value });

    };

    useEffect(() => {
        loadSNomenclature()
    }, []);


    const loadSNomenclature = async () => {
        const result = await axios.get(`http://localhost:8081/supplierNomenclature/${id}`);
        setSNomenclature(result.data);
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        


        let supplierId = selectedProviderId;
        if (!selectedProviderId) {
            supplierId = sNomenclature.supplier.id;
        }

        let nomenclatureId = selectedNomenclatureId;
        if (!selectedNomenclatureId) {
            nomenclatureId = sNomenclature.nomenclature.id;
        }

        await axios.put(`http://localhost:8081/supplierNomenclature/${id}/${nomenclatureId}/${supplierId}`,sNomenclature);
        navigate("/suppliernomenclature");
    };

    useEffect(() => {
        const fetchNomenclatures = async () => {
            const { data } = await axios.get("http://localhost:8081/nomenclatures");
            setNomenclatures(data);
        };
        fetchNomenclatures();
    }, []);

    const handleSelectNomenclature = (selectedNomenclature) => {
        setSelectedNomenclatureId(selectedNomenclature.id);
        setShowModalN(false);
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
                    <h2 className="text-center m-4">Изменить номенклатуру поставщика</h2>

                    <form onSubmit={(e) => onSubmit(e)}>



                        <div className="mb-3">
                            <label htmlFor="id_provider" className="form-label">
                                Номенклатура
                            </label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Выберите номенклатуру"
                                    value={
                                        selectedNomenclatureId
                                            ? nomenclatures.find((s) => s.id === selectedNomenclatureId)
                                                .name
                                            : ""
                                    }
                                    readOnly
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => setShowModalN(true)}
                                >
                                    Выбрать
                                </button>
                            </div>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="id_nomenclature" className="form-label">
                                Поставщик
                            </label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Выберите поставщика"
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


                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary me-2">
                                Сохранить
                            </button>
                            <Link to="/documents" className="btn btn-secondary">
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

                                            <td>{supplier.name}</td>
                                            <td>{supplier.address}</td>
                                            <td>{supplier.email}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Modal.Body>
                    </Modal>


                    <Modal show={showModalN} onHide={() => setShowModalN(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Выберите номенклатуру</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>

                                        <th>Название</th>
                                        <th>Ед. Измерения</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {nomenclatures.map((nomenclature) => (
                                        <tr
                                            key={nomenclature.id}
                                            onClick={() => handleSelectNomenclature(nomenclature)}
                                        >

                                            <td>{nomenclature.name}</td>
                                            <td>{nomenclature.unit}</td>

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