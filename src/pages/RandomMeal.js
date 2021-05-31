import useFetchMealDbApi from '../components/useFetchMealDbApi';
import { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import SkeletonMealInfo from '../skeletons/SkeletonMealInfo';
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/solid';
import ThemeToggle from '../components/theme-toggle/ThemeToggle';
import { DarkModeContext } from '../contexts/DarkModeProvider';

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

  const theme = useContext(DarkModeContext);
  const { syntax, ui, bg, icon, isDark } = theme.mode;
  const loaderTheme = isDark ? 'dark' : 'light';

  return (
    <div
      id="single-meal relative"
      style={{ background: ui, color: syntax }}
      className="min-h-screen md:pt-1"
    >
      {isError && <div className="min-h-screen">Something went wrong ...</div>}
      {isLoading
        ? [1, 2, 3, 4, 5].map((n) => (
            <SkeletonMealInfo Key={n} theme={loaderTheme} />
          ))
        : ingredients &&
          data && (
            <div
              className="max-w-7xl mx-auto relative min-h-screen"
              style={{ background: ui, color: syntax }}
            >
              <div className="max-w-full md:max-w-2xl lg:max-w-4xl mx-auto md:my-8 ">
                <div className="recipe-summary wrapper md:mt-8 flex flex-col-reverse w-full align-center justify-between md:flex-row">
                  <div className="recipe-details">
                    <div className="primary-info-text">
                      <div className="primary-info-left-wrapper">
                        <h1 className="recipe-title font-bold text-xl md:text-4xl  mt-0 ml-2 mb-4 w-80 md:mb-8 font-sans">
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
                <p className="single-meal-p w-11/12 m-auto md:mt-6 list-none pb-20">
                  {data.meals[0].strInstructions}
                </p>
              </div>

              <Link to="/">
                <button
                  className="home-btn absolute top-1 right-1 sm:top-0 sm:right-1  hover:bg-white  py-2 px-4 sm:px-2 lg:px-4 bg-gray-600 sm:bg-gray-500 rounded-sm"
                  style={{ background: bg, color: syntax }}
                >
                  <HomeIcon className="home-icon h-5 w-5  hover:text-black" />
                </button>
              </Link>
              <div className="absolute top-14 right-1 sm:right-1 xl:top-14 xl:right-2">
                <ThemeToggle
                  className="cursor-pointer focus:outline-none"
                  id="random"
                />
              </div>
            </div>
          )}
    </div>
  );
};

export default RandomMeal;
