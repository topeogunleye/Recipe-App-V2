import { useParams } from 'react-router';
import useFetchMealDbApi from './useFetchMealDbApi';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';

const MealInfo = () => {
  const { mealID } = useParams();
  const [ingredients, setIngredients] = useState('');
  const history = useHistory();

  const [{ data, isLoading, isError }, doFetch] = useFetchMealDbApi();

  useEffect(
    () =>
      doFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`),
    [doFetch, mealID, data]
  );

  function createIngredientsArray(meal) {
    const ingredientsData = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredientsData.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }

    setIngredients(ingredientsData);
  }

  console.log(ingredients);

  if (data && ingredients === '') {
    console.log(data);
    const meal = data.meals[0];
    createIngredientsArray(meal);
  }

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="recipe-summary wrapper mt-8 flex w-full align-center justify-between">
        <div className="recipe-details ">
          <div className="primary-info-text">
            <div className="primary-info-left-wrapper">
              <h1 className="recipe-title font-bold text-4xl text-gray-900 mt-0 mx-0 mb-20 font-sans">
                {data && data.meals[0].strMeal}
              </h1>
            </div>
          </div>
          <div className="summary-item-wrapper flex relative justify-start">
            <div className="recipe-summary-item  text-4xl flex flex-col w-28 border-r border-gray-400  justify-center items-center">
              <span className="value font-light text-4xl h-12">{ingredients && ingredients.length}</span>
              <span className="unit font-normal text-sm leading-3">
                Ingredients
              </span>
            </div>
            <div className="recipe-summary-item unit text-4xl flex flex-col w-36 border-r border-gray-400 justify-center items-center">
              <span className="value font-light text-4xl h-12">25</span>
              <span className="unit font-normal text-sm leading-3">
                Minutes
              </span>
            </div>
            <div className="recipe-summary-item nutrition text-4xl flex flex-col w-36 justify-center items-center">
              <span className="value font-light text-4xl h-12">210</span>
              <span className="unit font-normal text-sm leading-3">
                Calories
              </span>
            </div>
          </div>

          <div className="main mt-6">
            <h2 className="h-8">Ingredients</h2>
            <ul className="single-meal-ul">
              {ingredients &&
                ingredients.map((ing) => (
                  <li className="single-meal-ul-li" key={uuidv4()}>
                    {ing}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="recipe-details-image">
          <img
            alt="Cranberry Orange Muffins"
            src={data && data.meals[0].strMealThumb}
            className="recipe-image max-w-md rounded-lg"
          />
        </div>
      </div>
      <p className="single-meal-p">
        {ingredients && data && data.meals[0].strInstructions}
      </p>
    </div>
  );
};

export default MealInfo;
