import React, { useEffect, useState } from 'react';
import Header from './Header';
import PizzaForm from './PizzaForm';
import PizzaList from './PizzaList';

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [editPizza, setEditPizza] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/pizzas')
      .then((res) => res.json())
      .then((data) => setPizzas(data));
  }, []);

  function handleEdit(pizza) {
    setEditPizza(pizza);
  }
  function handleUpdatePizza(updatedPizza) {
    const updatedPizzaList = pizzas.map((pizza) => {
      if (pizza.id === updatedPizza.id) return updatedPizza;
      else return pizza;
    });

    setPizzas(updatedPizzaList);
  }
  return (
    <>
      <Header />
      <PizzaForm pizza={editPizza} onPizzaSubmit={handleUpdatePizza} />
      <PizzaList pizzas={pizzas} handleEdit={handleEdit} />
    </>
  );
}

export default App;
