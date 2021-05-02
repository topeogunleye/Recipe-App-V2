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
    <div className="bg-gray-800 sm:bg-gray-500 text-white min-h-screen">
      <div className="m-auto max-w-5xl flex flex-col items-center justify-center text-center">
        <h3 className="text-2xl font-bold">{strCategory}</h3>
        <div id="meals" className="meals-cat">
          {data &&
            data.meals.map((meal) => (
              <div id="meals" className="meals">
                {data.meals &&
                  data.meals.map((meal) => (
                    <div className="meal hover:shadow-lg" key={meal.idMeal}>
                      <Link to={`/MealInfo/${meal.idMeal}`}>
                        <img
                          src={meal.strMealThumb}
                          alt="stew"
                          className="h-40 sm:h-40 w-full object-cover"
                        />
                        <div className="m-4">
                          <span className="font-bold">{meal.strMeal}</span>
                          <span className="block text-sm">
                            {meal.strCategory}
                          </span>
                        </div>
                        <div className="badge">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>25 mins</span>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            ))}
        </div>
        <button
          className="absolute top-1 left-1 sm:top-4 sm:left-4 text-white hover:bg-white hover:text-black bg-gray-900 sm:bg-gray-700  py-1 px-1 sm:py-2 sm:px-4 md:hidden xl:block"
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
