import React, {useState} from 'react';
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";


export default function AddDocument() {

  let navigate=useNavigate();


  const [document,setDocument]= useState({
    number:"",
    date:"",
    status:"",
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
            <label htmFor="Status" className="form-label">Статус</label>
            <input type={"text"}
              className="form-control"
              placeholder="Введите статус"
              name="status" 
              value={status}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

          <div className="mb-3">
            <label htmFor="Type" className="form-label">Тип</label>
            <input type={"text"}
              className="form-control"
              placeholder="Введите тип"
              name="type" 
              value={type}
              onChange={(e)=>onInputChange(e)}
              />
          </div>


          <div className="mb-3">
            <label htmFor="id_provider" className="form-label">Поставщик</label>
            <input type={"text"}
              className="form-control"
              placeholder="Введите поставщика"
              name="id_provider" 
              value={id_provider}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

          <button type="submit" className="btn btn-outline-dark">Добавить</button>
          <Link  className="btn btn-outline-danger mx-2" to ="/documents">Отмена</Link>
          </form>
        </div>
      </div>
    </div>
  )
}
