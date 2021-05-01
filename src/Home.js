import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useFetchMealDbApi from './useFetchMealDbApi';
import Categories from './Categories';
import { SearchIcon, RefreshIcon } from '@heroicons/react/solid';

const Home = () => {
  const [query, setQuery] = useState('');

  const id = '715538';

  const [
    { data, isLoading, isError },
    doFetch,
  ] = useFetchMealDbApi(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    { meals: [] }
  );

  console.log(data.meals);

  return (
    <div className="body text-white max-w-5xl mx-auto grid">
      {/* <div className="md:col-span-1 md:flex bg-gray-900">
          <Categories />
        </div> */}
      <main className="px-16 py-6 md:col-span-4">
        <div className="flex justify-center md:justify-end">
          <button
            to="/"
            className="btn text-green-500 border-green-500 md:border-2 hover:bg-green-500 hover:text-white focus:outline-none transition ease-out duration-500"
          >
            Log in
          </button>
          <button
            to="/"
            className="btn text-green-500 ml-2 border-green-500 md:border-2 hover:bg-green-500 hover:text-white focus:outline-none transition ease-out duration-500"
          >
            Sign up
          </button>
        </div>

        <header className="mt-4">
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
              <button
                className="search-btn border rounded-r bg-white"
                type="submit"
              >
                <SearchIcon className="h-5 w-5 text-gray-900 " />
              </button>
            </form>
            <Link to={'/RandomMeal/'}>
              <button
                className="random-btn border rounded cursor-pointer ml-2.5 bg-white"
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
        </header>

        <div>
          <h4 className="font-bold pb-2 mt-12 border-b border-gray-200">
            Latest Recipes
          </h4>
          <div className="mt-8 grid tab-small sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {data.meals &&
              data.meals.map((meal) => (
                <div className="card hover:shadow-lg" key={meal.idMeal}>
                  <Link to={`/MealInfo/${meal.idMeal}`}>
                    <img
                      src={meal.strMealThumb}
                      alt="stew"
                      className="h-40 sm:h-48 w-full object-cover"
                    />
                  </Link>
                  <div className="m-4">
                    <span className="font-bold">{meal.strMeal}</span>
                    <span className="block text-sm">Recipe by Mario</span>
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
                </div>
              ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="btn bg-secondary-100 text-secondary-200 inline-block hover:shadow-inner transform hover:scale-125 hover:bg-opacity-50 transition ease-out duration-300">
            Load more
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
