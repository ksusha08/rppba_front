import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditNomenclature() {

    let navigate = useNavigate();

    const { id } = useParams()

    const [nomenclature, setNomenclature] = useState({
        name: "",
        unit: "",
        number: ""
    });

    const { name, unit,number } = nomenclature

    const onInputChange = async (e) => {

        setNomenclature({ ...nomenclature, [e.target.name]: e.target.value });

    };

    useEffect(() => {
        loadNomenclature()
    }, []);

    const onSubmit = async (e) => {

        e.preventDefault();
        await axios.put(`http://localhost:8081/nomenclature/${id}`, nomenclature);
        navigate("/nomenclature");

    };

    const loadNomenclature = async () => {
        const result = await axios.get(`http://localhost:8081/nomenclature/${id}`);
        setNomenclature(result.data);
    };

    return (
        <div className="container mainFon">
            <div className="row" >
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

                    <h2 className="text-center m-4">Редактировать номенклатуру</h2>


                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className="mb-3">
                            <label htmFor="Name" className="form-label">Имя</label>
                            <input
                                type={"text"}
                                class="form-control"
                                placeholder="Введите название номеклатуры"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
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
                        
                        <div className="mb-3">
                            <label htmFor="Unit" className="form-label">Ед. Измерения</label>
                            <input type={"text"}
                                className="form-control"
                                placeholder="Введите ед. измерения"
                                name="unit"
                                value={unit}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        


                        <button type="submit" className="btn btn-outline-dark">Редактировать</button>
                        <Link className="btn btn-outline-danger mx-2" to="/nomenclature">Отмена</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}