import useFetchMealDbApi from './useFetchMealDbApi';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import SkeletonMealInfo from './skeletons/SkeletonMealInfo';
import { Link } from 'react-router-dom';
import { HomeIcon, ChevronLeftIcon } from '@heroicons/react/solid';

const RandomMeal = () => {
  const [ingredients, setIngredients] = useState('');
  const history = useHistory();

  const [{ data, isLoading, isError }, doFetch] = useFetchMealDbApi();

  useEffect(
    () => doFetch(`https://www.themealdb.com/api/json/v1/1/random.php`),
    [doFetch, data]
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
    <div id="single-meal">
      {isError && <div>Something went wrong ...</div>}
      {isLoading
        ? [1, 2, 3, 4, 5].map((n) => <SkeletonMealInfo Key={n} theme="dark" />)
        : ingredients &&
          data && (
            <div className="max-w-7xl mx-auto h-screen relative">
              <div className="max-w-full md:max-w-2xl lg:max-w-4xl mx-auto md:my-8 text-white">
                <div className="recipe-summary wrapper md:mt-8 flex flex-col-reverse w-full align-center justify-between md:flex-row">
                  <div className="recipe-details">
                    <div className="primary-info-text">
                      <div className="primary-info-left-wrapper">
                        <h1 className="recipe-title font-bold text-xl md:text-4xl text-white mt-0 ml-2 mb-4 max-w-min md:mb-8 font-sans">
                          {data.meals[0].strMeal}
                        </h1>
                      </div>
                    </div>
                    <div className="summary-item-wrapper flex relative justify-center md:justify-start">
                      <div className="recipe-summary-item  text-4xl flex flex-col w-28 border-r border-gray-400  justify-center items-center">
                        <span className="value font-light text-4xl h-12">
                          {ingredients.length}
                        </span>
                        <span className="unit font-normal text-sm leading-3">
                          Ingredients
                        </span>
                      </div>
                      <div className="recipe-summary-item unit text-4xl flex flex-col w-36 border-r border-gray-400 justify-center items-center">
                        <span className="value font-light text-4xl h-12">
                          25
                        </span>
                        <span className="unit font-normal text-sm leading-3">
                          Minutes
                        </span>
                      </div>
                      <div className="recipe-summary-item nutrition text-4xl flex flex-col w-36 justify-center items-center">
                        <span className="value font-light text-4xl h-12">
                          210
                        </span>
                        <span className="unit font-normal text-sm leading-3">
                          Calories
                        </span>
                      </div>
                    </div>

                    <div className="main mt-6 text-center md:text-justify m-8">
                      <h2 className="h-8 text-center md:text-justify font-bold">
                        Ingredients
                      </h2>
                      <ul className="single-meal-ul w-11/12 mx-auto md:mx-0">
                        {ingredients.map((ing) => (
                          <li className="single-meal-ul-li" key={uuidv4()}>
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="recipe-details-image w-full">
                    <img
                      alt="Cranberry Orange Muffins"
                      src={data.meals[0].strMealThumb}
                      className="recipe-image max-w-full rounded-b-lg md:rounded-lg"
                    />
                  </div>
                </div>
                <p className="single-meal-p w-11/12 m-auto md:mt-6 list-none">
                  {data.meals[0].strInstructions}
                </p>
              </div>
              <button
                className="home-btn absolute top-1 left-1 sm:top-0 am:left-2 hover:bg-white  py-2 px-2 bg-gray-600 sm:bg-gray-500 rounded-sm"
                onClick={() => {
                  history.goBack(-1);
                }}
              >
                <ChevronLeftIcon className="home-icon h-5 w-5 text-white  hover:text-black" />
              </button>
              <Link to="/">
                <button className="home-btn absolute top-1 right-1 sm:top-0 sm:right-1  hover:bg-white  py-2 px-4 sm:px-2 lg:px-4 bg-gray-600 sm:bg-gray-500 rounded-sm">
                  <HomeIcon className="home-icon h-5 w-5 text-white  hover:text-black" />
                </button>
              </Link>
            </div>
          )}
    </div>
  );
};

export default RandomMeal;
