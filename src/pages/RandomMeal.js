import {
  useState, useEffect, useContext, useCallback,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BookmarkIcon } from '@heroicons/react/solid';
import SkeletonMealInfo from '../skeletons/SkeletonMealInfo';
import useFetchMealDbApi from '../components/useFetchMealDbApi';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import { BookmarkContext } from '../contexts/BookmarkContext';
import Navbar from '../components/Navbar/Navbar';

const RandomMeal = () => {
  const [ingredients, setIngredients] = useState([]);
  const [{ data, isLoading, isError }, doFetch] = useFetchMealDbApi();
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);
  const { mode } = useContext(DarkModeContext);
  const {
    syntax, ui, libg, lic, isDark,
  } = mode;
  const loaderTheme = isDark ? 'dark' : 'light';

  useEffect(() => {
    doFetch(
      `https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/random.php`,
    );
  }, [doFetch]);

  useEffect(() => {
    if (data) {
      const meal = data.meals[0];
      const ingredientsArray = [];

      for (let i = 1; i <= 20; i += 1) {
        if (meal[`strIngredient${i}`]) {
          ingredientsArray.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`,
          );
        } else {
          break;
        }
      }

      setIngredients(ingredientsArray);
    }
  }, [data]);

  const persistBookmarks = useCallback(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = useCallback(
    (recipe) => {
      if (!bookmarks.some((bookmark) => bookmark.idMeal === recipe.idMeal)) {
        setBookmarks([...bookmarks, recipe]);

        if (data && recipe.idMeal === data.meals[0].idMeal) {
          data.meals[0].bookmarked = true;
        }

        persistBookmarks();
      }
    },
    [bookmarks, data, persistBookmarks, setBookmarks],
  );

  const deleteBookmark = useCallback(
    (recipe) => {
      const updatedBookmarks = bookmarks.filter(
        (bookmark) => bookmark.idMeal !== recipe.idMeal,
      );
      setBookmarks(updatedBookmarks);

      if (data && recipe.idMeal === data.meals[0].idMeal) {
        data.meals[0].bookmarked = false;
      }

      persistBookmarks();
    },
    [bookmarks, data, persistBookmarks, setBookmarks],
  );

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(storedBookmarks);
  }, [setBookmarks]);

  useEffect(() => {
    if (data && data.meals[0]) {
      data.meals[0].bookmarked = bookmarks.some(
        (bookmark) => bookmark.idMeal === data.meals[0].idMeal,
      );
    }
  }, [data, bookmarks]);

  return (
    <div
      id="single-meal"
      className="relative min-h-screen md:pt-1"
      style={{ background: ui, color: syntax }}
    >
      <Navbar />
      {isError && <div className="min-h-screen">Something went wrong ...</div>}
      {isLoading
        ? [1, 2, 3, 4, 5].map((n) => (
          <SkeletonMealInfo key={n} theme={loaderTheme} />
        ))
        : data && (
        <div className="max-w-7xl mx-auto relative min-h-screen">
          <div className="max-w-4xl md:max-w-2xl lg:max-w-4xl lg:pl-44 xl:max-w-5xl mx-auto xl:pl-32 md:mb-8 mt-0">
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
                  onClick={() => (data.meals[0].bookmarked
                    ? deleteBookmark(data.meals[0])
                    : addBookmark(data.meals[0]))}
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

export default RandomMeal;
