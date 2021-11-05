import { useParams } from 'react-router';
import useFetchMealDbApi from '../useFetchMealDbApi';
import { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SkeletonMealInfo from '../../skeletons/SkeletonMealInfo';
import { BookmarkIcon } from '@heroicons/react/solid';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import './mealinfo.css';
import { BookmarkContext } from '../../contexts/BookmarkContext';
import Navbar from '../Navbar/Navbar';

const MealInfo = () => {
  const { mealID } = useParams();
  const [ingredients, setIngredients] = useState('');

  const [{ data, isLoading, isError }, doFetch] = useFetchMealDbApi();

  useEffect(
    () =>
      doFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`),
    [doFetch, mealID, data]
  );

  const [bookmarked, setBookmarked] = useState(
    data && data.meals[0].bookmarked
  );

  let { bookmarks } = useContext(BookmarkContext);

  const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  };

  const addBookmark = function (recipe) {
    // console.log(dataFromApi)

    // Add bookmark
    bookmarks.push(recipe);

    // Mark current recipe as bookmark
    if (data && recipe.idMeal === data.meals[0].idMeal) {
      data.meals[0].bookmarked = true;
      setBookmarked(true);
    }

    persistBookmarks();
    console.log(bookmarked);
  };

  // Check if the loaded recipe has the same id
  // with a recipe in the bookmarked state

  const [storedBookmarksCheck, setStoredBookmarksCheck] = useState([]);

  useEffect(() => {
    if (storedBookmarksCheck && data) {
      checkBookmark();
    }
  });

  useEffect(() => {
    setStoredBookmarksCheck(JSON.parse(localStorage.getItem('bookmarks')));
  }, [bookmarks]);

  const checkBookmark = () => {
    if (
      storedBookmarksCheck &&
      storedBookmarksCheck.some(
        (bookmark) => bookmark.idMeal === data.meals[0].idMeal
      )
    ) {
      data.meals[0].bookmarked = true;
      // setBookmarked(true)
    } else {
      data.meals[0].bookmarked = false;
      // setBookmarked(false)
    }
  };

  useEffect(() => {
    if (data && data.meals[0].bookmarked === true) {
      setBookmarked(true);
    } else if (data && data.meals[0].bookmarked === false) {
      setBookmarked(false);
    }
  }, [data]);

  const deleteBookmark = function (recipe) {
    console.log(storedBookmarksCheck);

    // Delete bookmark
    const index = bookmarks.findIndex((el) => el.idMeal === recipe.idMeal);
    bookmarks.splice(index, 1);

    // Mark current recipe as NOT bookmark
    if (data && recipe.idMeal === data.meals[0].idMeal) {
      data.meals[0].bookmarked = false;
      setBookmarked(false);
    }

    persistBookmarks();
    console.log(bookmarked);
  };

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

  if (data && ingredients === '') {
    const meal = data.meals[0];
    createIngredientsArray(meal);
  }

  const theme = useContext(DarkModeContext);
  const { syntax, ui, lic, libg, isDark } = theme.mode;
  const loaderTheme = isDark ? 'dark' : 'light';

  return (
    <div
      id="single-meal relative"
      className="min-h-screen md:pt-1"
      style={{ background: ui, color: syntax }}
    >
      <Navbar />
      {isError && <div>Something went wrong ...</div>}
      {isLoading
        ? [1, 2, 3, 4, 5].map((n) => (
            <SkeletonMealInfo key={n} theme={loaderTheme} />
          ))
        : ingredients &&
          data && (
            <div className="max-w-7xl mx-auto relative min-h-screen transition-all duration-1000 ease-out">
              <div className="max-w-4xl md:max-w-2xl lg:max-w-4xl lg:pl-44 xl:max-w-5xl mx-auto xl:pl-32  md:mb-8 mt-0 transition-all duration-1000 ease-out">
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
                      alt={data.meals.strMeal}
                      src={data.meals[0].strMealThumb}
                      className="recipe-image w-11/12 mx-auto md:max-w-full rounded-lg md:rounded-lg mobile"
                    />
                    <button
                      className={
                        data.meals[0].bookmarked
                          ? ' text-gray-900 absolute top-1 right-3 sm:top-1 sm:right-3 rounded-full focus:outline-none p-2'
                          : ' text-gray-400 absolute top-1 right-3 sm:top-1 sm:right-3 rounded-full focus:outline-none p-2'
                      }
                      onClick={
                        data.meals[0].bookmarked === true
                          ? () => deleteBookmark(data.meals && data.meals[0])
                          : () => addBookmark(data.meals && data.meals[0])
                      }
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
                        className={
                          data.meals[0].bookmarked === true
                            ? 'home-icon h-10 w-10 text-gray-900'
                            : 'home-icon h-10 w-10 text-gray-300'
                        }
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
