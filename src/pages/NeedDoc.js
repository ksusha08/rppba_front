import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import MainMenu from "../menu/MainMenu";


export default function NeedDoc() {
    let navigate = useNavigate();
    const [needDoc, setNeedDocs] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadNeedDocs();
    }, []);

    const loadNeedDocs = async () => {
        const result = await axios.get("http://localhost:8081/needDocs");
        setNeedDocs(result.data);
    };

    const deleteNeedDoc = async (id) => {
        await axios.delete(`http://localhost:8081/needDoc/${id}`);
        loadNeedDocs();
    };

    const [need, setNeed] = useState({
        date: new Date().toISOString().slice(0, 10)
    });


    const onSubmit = async () => {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        await axios.post(`http://localhost:8081/needDoc/${userId}`, need);
        loadNeedDocs();

    };




    const { number } = need

    return (
        <div className="mainFon">

            <MainMenu />

            <h1 >Потребность</h1>

            <div className="container">
                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <div className="py-4 d-flex justify-content-end">
                        <table className="table border shadow">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Дата</th>
                                    <th scope="col">Пользователь</th>
                                    <th scope="col">
                                        <button
                                            onClick={() => onSubmit()}
                                            className="btn btn-dark ml-0 "
                                            style={{ float: "right" }}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                        Действие</th>
                                </tr>
                            </thead>
                            <tbody>
                                {needDoc.map((object, index) => (
                                    <tr>
                                        <th scope="row" key={index}>
                                            {index + 1}
                                        </th>

                                        <td>{new Date(object.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                        <td>{object.user.name}</td>


                                        <td>

                                            <Link
                                                className="btn btn-dark mx-0"
                                                to={`/openNeedDoc/${object.id}`}
                                            >
                                                <FontAwesomeIcon icon={faFolderOpen} />
                                            </Link>

                                            <button
                                                className="btn btn-dark mx-2"
                                                onClick={() => deleteNeedDoc(object.id)}
                                            >
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>

                                            <Link
                                                className="btn btn-dark mx-0"
                                                to={`/need/${object.id}`}
                                            >
                                                Расчет
                                            </Link>




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
