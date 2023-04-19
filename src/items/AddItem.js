import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AddItem() {
  let navigate = useNavigate();

  const [item, setItem] = useState({
    name: '',
    vendoreCode: '',
    description: '',
    discountPrice: '',
    photos: null,
  });

  const { name, vendoreCode, description, discountPrice, photos } = item;

  const onInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setItem({ ...item, photos: e.target.files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photos', photos);
    formData.append('name', name);
    formData.append('vendoreCode', vendoreCode);
    formData.append('description', description);
    formData.append('discountPrice', discountPrice);

    await axios.post('http://localhost:8081/item', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    navigate('/items');
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Добавить товар</h2>

          <form onSubmit={(e) => onSubmit(e)} enctype="multipart/form-data">
            <div className='mb-3'>
              <label htmlFor='Name' className='form-label'>
                Наименование
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Введите наименование'
                name='name'
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='Email' className='form-label'>
                Артикул
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Введите артикул'
                name='vendoreCode'
                value={vendoreCode}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='Address' className='form-label'>
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
              <label htmlFor='Address' className='form-label'>
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

            <div className='mb-3'>
              <label htmlFor='photos' className='form-label'>
                Фото
              </label>
              <input
                type='file'
                className='form-control'
                name='photos'
                onChange={(e) => onFileChange(e)}
              />
            </div>       
             <div className='d-flex justify-content-between align-items-center'>
              <Link to='/items' className='btn btn-danger'>
                Назад
              </Link>
              <button type='submit' className='btn btn-primary'>
                Добавить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}