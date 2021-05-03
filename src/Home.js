import { Link } from 'react-router-dom';
import React, { Fragment, useState } from 'react';
import useFetchMealDbApi from './useFetchMealDbApi';
import Categories from './Categories';
import {
  SearchIcon,
  RefreshIcon,
  CollectionIcon,
} from '@heroicons/react/solid';
import SkeletonHeader from './skeletons/SkeletonHeader';

const Home = () => {
  const [query, setQuery] = useState('');

  const [
    { data, isLoading, isError },
    doFetch,
  ] = useFetchMealDbApi(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    { meals: [] }
  );

  console.log(data.meals);

  return (
    <Fragment>
      <div className="bg-gray-800 sm:bg-gray-500 text-white min-h-screen">
        <div className="m-auto max-w-5xl flex flex-col items-center justify-center text-center">
          <h1 className="font-black text-2xl">Meal Finder</h1>
          <div className="flex flex-col sm:flex-row">
            <div className="flex mt-2">
              <form
                className="flex"
                onSubmit={(event) => {
                  doFetch(
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
                  );

                  event.preventDefault();
                }}
              >
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="border rounded-l sm:w-full text-black"
                />
                <button className="search-btn border rounded-r" type="submit">
                  <SearchIcon className="h-5 w-5 text-gray-900" />
                </button>
              </form>
              <Link to={'/RandomMeal/'}>
                <button
                  className="random-btn border rounded cursor-pointer ml-2.5"
                  id="random"
                  onCLick={(event) => {
                    doFetch(
                      `https://www.themealdb.com/api/json/v1/1/random.php `
                    );
                    event.preventDefault();
                  }}
                >
                  <RefreshIcon className="h-5 w-5 text-gray-900" />
                </button>
              </Link>
            </div>
            <Link to={'/Categories/'}>
              <button
                className="random-btn border rounded cursor-pointer ml-2.5 mt-2"
                id="random"
                onCLick={(event) => {
                  doFetch(
                    `https://www.themealdb.com/api/json/v1/1/random.php `
                  );
                  event.preventDefault();
                }}
              >
                <CollectionIcon className="h-5 w-5 text-gray-900" />
              </button>
            </Link>
          </div>

          {isError && <div>Something went wrong ...</div>}
          {!data.meals && <div>There is no result. Try again!</div>}
          {/* {data.meals && <h1>{query}</h1> } */}
          {isLoading ? (
            // <div>Loading ...</div>
            [1, 2, 3, 4, 5].map((n) => <SkeletonHeader Key={n} theme="dark" />)
          ) : (
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
          )}

          <div class="btn my-12 bg-secondary-100 text-secondary-200 inline-block hover:shadow-inner transform hover:scale-125 hover:bg-opacity-50 transition ease-out duration-300">
            Load more
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
