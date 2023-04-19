import React, {useState} from 'react';
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";

export default function AddSupplier() {

  let navigate=useNavigate()

  const [supplier,setSupplier]= useState({
    name:"",
    email:"",
    address:""
  });

  const{name,email,address}=supplier

  const onInputChange= async (e)=>{

   setSupplier({...supplier,[e.target.name]:e.target.value});

  };

  const onSubmit= async (e)=>{

    e.preventDefault();
    await axios.post("http://localhost:8081/supplier",supplier);
    navigate("/suppliers");

  };

  return (
    <div className="container">
      <div className="row" >
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

          <h2 className="text-center m-4">Добавить поставщика</h2>


          <form onSubmit={(e)=>onSubmit(e)}>

          <div className="mb-3">
            <label htmFor="Name" className="form-label">Имя поставщика</label>
            <input
              type={"text"}
              class="form-control"
              placeholder="Введите имя"
              name="name" 
              value={name}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

          <div className="mb-3">
            <label htmFor="Email" className="form-label">Почта</label>
            <input type={"text"}
              className="form-control"
              placeholder="Введите почту"
              name="email" 
              value={email}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

          <div className="mb-3">
            <label htmFor="Address" className="form-label">Адрес</label>
            <input type={"text"}
              className="form-control"
              placeholder="Введите адрес"
              name="address" 
              value={address}
              onChange={(e)=>onInputChange(e)}
              />
          </div>


          <button type="submit" className="btn btn-outline-dark">Добавить</button>
          <Link  className="btn btn-outline-danger mx-2" to ="/suppliers">Отмена</Link>
          </form>
        </div>
      </div>
    </div>
  )
}
