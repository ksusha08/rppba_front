import React, {useState} from 'react';
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";

export default function AddNomenclature() {

    let navigate=useNavigate()
  
    const [nomenclature,setNomenclature]= useState({
      name:"",
      unit:"",
      number: 0
    });
  
    const{name,unit,number}=nomenclature
  
    const onInputChange= async (e)=>{
  
        setNomenclature({...nomenclature,[e.target.name]:e.target.value});
  
    };
  
    const onSubmit= async (e)=>{
  
      e.preventDefault();
      await axios.post("http://localhost:8081/nomenclature",nomenclature);
      navigate("/nomenclature");
  
    };
  
    return (
      <div className="container mainFon">
        <div className="row" >
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
  
            <h2 className="text-center m-4">Добавить номенклатуру</h2>
  
  
            <form onSubmit={(e)=>onSubmit(e)}>
  
            <div className="mb-3">
              <label htmFor="Name" className="form-label">Название</label>
              <input
                type={"text"}
                class="form-control"
                placeholder="Введите название"
                name="name" 
                value={name}
                onChange={(e)=>onInputChange(e)}
                />
            </div>
  
            <div className="mb-3">
              <label htmFor="Unit" className="form-label">Ед. Измерения</label>
              <input type={"text"}
                className="form-control"
                placeholder="Введите ед. измерения"
                name="unit" 
                value={unit}
                onChange={(e)=>onInputChange(e)}
                />
            </div>
  
            
  
  
            <button type="submit" className="btn btn-outline-dark">Добавить</button>
            <Link  className="btn btn-outline-danger mx-2" to ="/nomenclature">Отмена</Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
  