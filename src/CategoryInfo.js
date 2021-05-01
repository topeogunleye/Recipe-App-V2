import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import useFetchMealDbApi from './useFetchMealDbApi';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const CategoryInfo = () => {
  const history = useHistory();

  const { strCategory } = useParams();

  const [{ data, isLoading, isError }, doFetch] = useFetchMealDbApi();

  useEffect(
    () =>
      doFetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`
      ),
    [doFetch, strCategory, data]
  );

  if (data) {
    console.log(data.meals[0].idMeal);
    console.log(strCategory);
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen my-4">
      <div className="m-auto max-w-3xl flex flex-col items-center justify-center text-center">
        <h3 className="text-2xl font-bold">{strCategory}</h3>
        <div id="meals" className="meals-cat">
          {data &&
            data.meals.map((meal) => (
              <div className="meal-cat" key={meal.idMeal}>
                <Link to={`/MealInfo/${meal.idMeal}`}>
                  <img
                    className="meal-img-cat"
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                  />
                  <div className="meal-info-cat" data-mealid={meal.idMeal}>
                    <h3>{meal.strMeal}</h3>
                  </div>
                </Link>
              </div>
            ))}
        </div>
        <button
          className="absolute top-1 left-1 sm:top-4 sm:left-4 hover:bg-white hover:text-black bg-gray-800 py-1 px-1 sm:py-2 sm:px-4"
          onClick={() => {
            history.go(-1);
          }}
        >
          &laquo; Go Back
        </button>
      </div>
    </div>
  );
};

export default CategoryInfo;
