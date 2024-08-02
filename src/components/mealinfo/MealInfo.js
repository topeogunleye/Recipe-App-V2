import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BookmarkIcon } from '@heroicons/react/solid';
import SkeletonMealInfo from '../../skeletons/SkeletonMealInfo';
import useFetchMealDbApi from '../useFetchMealDbApi';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import './mealinfo.css';
import { BookmarkContext } from '../../contexts/BookmarkContext';
import Navbar from '../Navbar/Navbar';

const MealInfo = () => {
  const { mealID } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [{ data, isLoading, isError }, doFetch] = useFetchMealDbApi();
  const { addBookmark, deleteBookmark, persistBookmarks } = useContext(BookmarkContext);
  const theme = useContext(DarkModeContext);

  useEffect(() => {
    doFetch(
      `https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/lookup.php?i=${mealID}`,
    );
  }, [doFetch, mealID]);

  useEffect(() => {
    if (data) {
      const meal = data.meals[0];
      const ingredientsArray = Array.from({ length: 20 }, (_, i) => {
        const ingredient = meal[`strIngredient${i + 1}`];
        const measure = meal[`strMeasure${i + 1}`];
        return ingredient ? `${ingredient} - ${measure}` : null;
      }).filter(Boolean);
      setIngredients(ingredientsArray);
    }
  }, [data]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    if (storedBookmarks && data) {
      const meal = data.meals[0];
      meal.bookmarked = storedBookmarks.some(
        (bookmark) => bookmark.idMeal === meal.idMeal,
      );
      persistBookmarks(storedBookmarks);
    }
  }, [data, persistBookmarks]);

  const handleBookmarkClick = (recipe) => {
    if (recipe.bookmarked) {
      deleteBookmark(recipe);
    } else {
      addBookmark(recipe);
    }
    persistBookmarks();
  };

  if (isError) {
    return <div>Something went wrong ...</div>;
  }

  const {
    syntax, ui, lic, libg, isDark,
  } = theme.mode;
  const loaderTheme = isDark ? 'dark' : 'light';

  return (
    <div
      id="single-meal"
      className="min-h-screen md:pt-1 relative"
      style={{ background: ui, color: syntax }}
    >
      <Navbar />
      {isLoading
        ? Array.from({ length: 5 }, (_, i) => (
          <SkeletonMealInfo key={i} theme={loaderTheme} />
        ))
        : data && (
          <div className="max-w-7xl mx-auto relative min-h-screen transition-all duration-1000 ease-out">
            <div className="max-w-4xl md:max-w-2xl lg:max-w-4xl lg:pl-44 xl:max-w-5xl mx-auto xl:pl-32 md:mb-8 mt-0 transition-all duration-1000 ease-out">
              <div className="recipe-summary wrapper md:mt-8 flex flex-col-reverse w-full align-center justify-between md:flex-row">
                <div className="recipe-details">
                  <div className="primary-info-text">
                    <div className="primary-info-left-wrapper">
                      <h2 className="recipe-title font-bold text-xl md:text-4xl mt-0 ml-2 mb-4 sm:w-full md:mb-8 font-sans w-80">
                        {data.meals[0].strMeal}
                      </h2>
                    </div>
                  </div>
                  <div className="summary-item-wrapper flex relative justify-center md:justify-start">
                    <div className="recipe-summary-item text-4xl flex flex-col w-28 border-r border-gray-400 justify-center items-center">
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
                        <li
                          className="single-meal-ul-li"
                          key={uuidv4()}
                          style={{ background: libg, color: lic }}
                        >
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="recipe-details-image w-full mobile-div relative">
                  <img
                    alt={data.meals[0].strMeal}
                    src={data.meals[0].strMealThumb}
                    className="recipe-image w-11/12 mx-auto md:max-w-full rounded-lg md:rounded-lg mobile"
                  />
                  <button
                    type="button"
                    className={`absolute top-1 right-3 sm:top-1 sm:right-3 rounded-full focus:outline-none p-2 ${
                      data.meals[0].bookmarked
                        ? 'text-gray-900'
                        : 'text-gray-400'
                    }`}
                    onClick={() => handleBookmarkClick(data.meals[0])}
                    title={
                      data.meals[0].bookmarked
                        ? 'Remove From Bookmarks'
                        : 'Add To Bookmarks'
                    }
                    aria-label={
                      data.meals[0].bookmarked
                        ? 'Remove From Bookmarks'
                        : 'Add To Bookmarks'
                    }
                  >
                    <BookmarkIcon
                      className={`home-icon h-10 w-10 ${
                        data.meals[0].bookmarked
                          ? 'text-gray-900'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                </div>
              </div>
              <p className="single-meal-p w-11/12 m-auto md:mt-6 list-none pb-20 pt-10">
                {data.meals[0].strInstructions}
              </p>
            </div>
          </div>
        )}
    </div>
  );
};

export default MealInfo;
