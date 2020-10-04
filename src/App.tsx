import React, { useState } from 'react';
import './App.css';

interface Meal {
  id: any,
  name: string,
}

const initMeal = { id: undefined, name: '' };

function App() {
  const [meals, setMeals] = useState<Array<Meal>>([]);
  const [meal, setMeal] = useState<Meal | typeof initMeal>(initMeal);

  const createId = () => Math.floor(Math.random() * 100);

  const addMeal = (input) => {
    const newId = createId();
    setMeals((oldVal) => [...oldVal, { id: newId, name: input.name }]);
    setMeal(initMeal);
  };
  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (meals.length >= 7) return alert('You reached the maximum');
    addMeal(meal);
  };

  const handleOnChange = (e: React.SyntheticEvent) => {
    const { value: newMeal } = e.target as HTMLInputElement;
    setMeal((oldState) => ({ ...oldState, name: newMeal }));
  };

  /* eslint-disable no-param-reassign */
  function shuffle(a) {
    let j; let x; let i;
    for (i = a.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  const randomize = () => setMeals([...shuffle(meals)]);

  return (
    <div className="app-container">
      <form onSubmit={handleOnSubmit} className="form">
        <input
          type="text"
          value={meal.name}
          onChange={handleOnChange}
          placeholder="Meal name"
        />
        <button
          type="submit"
          disabled={!meal.name.length}
        >
          Add Meal
        </button>
      </form>
      <button
        type="button"
        onClick={randomize}
        className="randomize-button"
        disabled={(meals.length < 7)}
      >
        Randomize
      </button>
      <hr />
      <table>
        <tr>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
          <th>Sunday</th>
        </tr>
        <tr>
          {meals.length > 0 && meals.map((food: Meal) => (
            <td key={food.id}>
              {food.id}
              -
              {food.name}
            </td>
          ))}
        </tr>
      </table>
    </div>
  );
}

export default App;
