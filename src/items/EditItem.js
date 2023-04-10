import React, {useEffect,useState} from 'react';
import axios from "axios";
import {Link,useNavigate,useParams} from "react-router-dom";

export default function EditItem() {

  let navigate=useNavigate();

  const {id} = useParams()

  const [item,setItem]= useState({
    name:"",
    vendoreCode:"",
    description:"",
    discountPrice:""
  });

  const{name,vendoreCode,description,discountPrice}=item

  const onInputChange= async (e)=>{

    setItem({...item,[e.target.name]:e.target.value});

  };

  useEffect(()=>{
    loadItem()
  }, []);

  const onSubmit= async (e)=>{

    e.preventDefault();
    await axios.put(`http://localhost:8080/item/${id}`,item);
    navigate("/items");

  };

  const loadItem = async ()=>{
    const result = await axios.get(`http://localhost:8080/item/${id}`);
    setItem(result.data);
  };

  return (
    <div className="container">
      <div className="row" >
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

          <h2 className="text-center m-4">Редактировать товар</h2>


          <form onSubmit={(e)=>onSubmit(e)}>

          <div className="mb-3">
            <label htmFor="Name" className="form-label">Наименование</label>
            <input
              type={"text"}
              class="form-control"
              placeholder="Введите наименование"
              name="name" 
              value={name}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

          <div className="mb-3">
            <label htmFor="vendoreCode" className="form-label">Артикул</label>
            <input type={"text"}
              className="form-control"
              placeholder="Введите артикул"
              name="vendoreCode" 
              value={vendoreCode}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

          <div className="mb-3">
            <label htmFor="Description" className="form-label">Описание</label>
            <input type={"text"}
              className="form-control"
              placeholder="Введите описание"
              name="description" 
              value={description}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

          <div className="mb-3">
            <label htmFor="discountPrice" className="form-label">Цена</label>
            <input type={"text"}
              className="form-control"
              placeholder="Введите цену"
              name="discountPrice" 
              value={discountPrice}
              onChange={(e)=>onInputChange(e)}
              />
          </div>


          <button type="submit" className="btn btn-outline-dark">Редактировать</button>
          <Link  className="btn btn-outline-danger mx-2" to ="/items">Отмена</Link>
          </form>
        </div>
      </div>
    </div>
  )
}