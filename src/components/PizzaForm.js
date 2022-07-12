import React, { useEffect, useState } from 'react';

function PizzaForm({ pizza, onPizzaSubmit }) {
  const [formData, setFormData] = useState({
    topping: '',
    size: '',
    vegetarian: '',
  });

  useEffect(() => {
    setFormData({
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian,
    });
  }, [pizza]);

  function handleChange(e) {
    const name = e.target.name;
    let value = '';
    (() => {
      if (e.target.value === 'Vegetarian') value = true;
      else if (e.target.value === 'Not Vegetarian') value = false;
      else value = e.target.value;
    })();
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3001/pizzas/${pizza.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => onPizzaSubmit(data));
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-row'>
        <div className='col-5'>
          <input
            className='form-control'
            type='text'
            name='topping'
            placeholder='Pizza Topping'
            value={formData.topping}
            onChange={handleChange}
          />
        </div>
        <div className='col'>
          <select
            className='form-control'
            name='size'
            value={formData.size}
            onChange={handleChange}
          >
            <option value='Small'>Small</option>
            <option value='Medium'>Medium</option>
            <option value='Large'>Large</option>
          </select>
        </div>
        <div className='col'>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='vegetarian'
              value='Vegetarian'
              checked={formData.vegetarian ? true : false}
              onChange={handleChange}
            />
            <label className='form-check-label'>Vegetarian</label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='vegetarian'
              value='Not Vegetarian'
              checked={formData.vegetarian ? false : true}
              onChange={handleChange}
            />
            <label className='form-check-label'>Not Vegetarian</label>
          </div>
        </div>
        <div className='col'>
          <button type='submit' className='btn btn-success'>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
