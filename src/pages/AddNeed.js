import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Table } from "react-bootstrap";

export default function AddNeed() {
    const [nomenclatures, setNomenclatures] = useState([]);
    const [showModalN, setShowModalN] = useState(false);
    const [selectedNomenclatureId, setSelectedNomenclatureId] = useState(null);


    let navigate = useNavigate()

    const [need, setNeed] = useState({
        number: ""
    });

    const { number } = need

    const onInputChange = async (e) => {

        setNeed({ ...need, [e.target.name]: e.target.value });

    };

    const onSubmit = async (e) => {

        e.preventDefault();

        const nomenclatureId = selectedNomenclatureId;
        await axios.post(`http://localhost:8081/need/${nomenclatureId}`, need);
        navigate("/need");

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

    return (
        <div className="container">
            <div className="row" >
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

                    <h2 className="text-center m-4">Добавить потребность</h2>


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
                            <label htmFor="number" className="form-label">Количество</label>
                            <input type={"text"}
                                className="form-control"
                                placeholder="Введите количество"
                                name="number"
                                value={number}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>




                        <button type="submit" className="btn btn-outline-dark">Добавить</button>
                        <Link className="btn btn-outline-danger mx-2" to="/need">Отмена</Link>
                    </form>
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
    )
}
