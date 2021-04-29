import { Link } from 'react-router-dom';
import curry from './curry.jpg';
import noodles from './noodles.jpg';
import stew from './stew.jpg';
import { useState, useEffect } from 'react';
import useFetchMealDbApi from './useFetchMealDbApi';
import Categories from './Categories';

const Home = () => {
  const query = 'beans';

  const id = '715538';

  const [
    { data, isLoading, isError },
    doFetch,
  ] = useFetchMealDbApi(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken',
    { meals: [] }
  );

  console.log(data.meals);

  return (
    <div className="body">
      <div className="grid md:grid-cols-3">
        <div className="md:col-span-1 md:flex md:justify-end">
          <nav className="text-right">
            <div className="flex justify-between items-center">
              <h1 className="font-bold uppercase p-4 border-b border-gray-100">
                <a href="/" className="hover:text-gray-700 tracking-widest">
                  Food Ninja
                </a>
              </h1>
              <div className="px-4 cursor-pointer md:hidden" id="burger">
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
            </div>
            <ul className="text-sm mt-6 hidden md:block" id="menu">
              <li className="text-gray-700 font-bold py-1">
                <Link
                  to="/Home"
                  className="block px-4 flex justify-end border-r-4 border-primary"
                >
                  <span>Home</span>
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
              </li>
              <li className="py-1">
                <Link
                  to="/About"
                  className="block px-4 flex justify-end border-r-4 border-white"
                >
                  <span>About</span>
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
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </Link>
              </li>
              <li className="py-1">
                <Link
                  to="/Contact"
                  className="block px-4 flex justify-end border-r-4 border-white"
                >
                  <span>Contact</span>
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <main className="px-16 py-6 md:col-span-2 bg-gray-100">
          <div className="flex justify-center md:justify-end">
            <button
              to="/"
              className="btn text-primary border-primary md:border-2 hover:bg-primary hover:text-white focus:outline-none transition ease-out duration-500"
            >
              Log in
            </button>
            <button
              to="/"
              className="btn text-primary ml-2 border-primary md:border-2 hover:bg-primary hover:text-white focus:outline-none transition ease-out duration-500"
            >
              Sign up
            </button>
          </div>

          <header className="mt-4">
            <h2 className="text-gray-700 text-6xl font-semibold leading-none tracking-wider">
              Recipes
            </h2>
            <h3 className="text-2xl font-semibold tracking-wider">
              For Ninjas
            </h3>

            <Categories />
          </header>

          <div>
            

            <h4 className="font-bold pb-2 mt-12 border-b border-gray-200">
              Latest Recipes
            </h4>
            <div className="mt-8 grid lg:grid-cols-3 gap-10">
              {data.meals &&
                data.meals.map((meal) => (
                  <div className="card hover:shadow-lg" key={meal.idMeal}>
                    <Link to={`/MealInfo/${meal.idMeal}`}>
                      <img
                        src={meal.strMealThumb}
                        alt="stew"
                        className="h-32 sm:h-48 w-full object-cover"
                      />
                    </Link>
                    <div className="m-4">
                      <span className="font-bold">{meal.strMeal}</span>
                      <span className="block text-gray-500 text-sm">
                        Recipe by Mario
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
                  </div>
                ))}
            </div>
            <h4 className="font-bold pb-2 mt-12 border-b border-gray-200">
              Most Popular
            </h4>
            <div className="mt-8 grid lg:grid-cols-3 gap-10">
              {/* cards go here */}
              <div className="card hover:shadow-lg">
                <img
                  src={stew}
                  alt="stew"
                  className="h-32 sm:h-48 w-full object-cover"
                />
                <div className="m-4">
                  <span className="font-bold truncate block">
                    5 Bean Chili Stew with Feta Cheese
                  </span>
                  <span className="block text-gray-500 text-sm">
                    Recipe by Mario
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
              </div>
              <div className="card hover:shadow-lg">
                <img
                  src={noodles}
                  alt="noodles"
                  className="h-32 sm:h-48 w-full object-cover"
                />
                <div className="m-4">
                  <span className="font-bold">Veg Noodles</span>
                  <span className="block text-gray-500 text-sm">
                    Recipe by Mario
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
              </div>
              <div className="card hover:shadow-lg">
                <img
                  src={curry}
                  alt="curry"
                  className="h-32 sm:h-48 w-full object-cover"
                />
                <div className="m-4">
                  <span className="font-bold">Tofu Curry</span>
                  <span className="block text-gray-500 text-sm">
                    Recipe by Mario
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
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="btn bg-secondary-100 text-secondary-200 inline-block hover:shadow-inner transform hover:scale-125 hover:bg-opacity-50 transition ease-out duration-300">
              Load more
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
