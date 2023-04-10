import React, {useEffect,useState} from 'react';
import axios from "axios";
import {Link,useNavigate,useParams} from "react-router-dom";

export default function EditDocument() {

  let navigate=useNavigate();

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
            <label htmFor="status" className="form-label">Статус</label>
            <input type={"text"}
              className="form-control"
              placeholder="Введите статус"
              name="status" 
              value={status}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

          <div className="mb-3">
            <label htmFor="type" className="form-label">Тип</label>
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

          <button type="submit" className="btn btn-outline-dark">Редактировать</button>
          <Link  className="btn btn-outline-danger mx-2" to ="/documents">Отмена</Link>
          </form>
        </div>
      </div>
    </div>
  )
}