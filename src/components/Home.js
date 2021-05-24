import { Link } from 'react-router-dom';
import React, { Fragment, useState, useContext } from 'react';
import useFetchMealDbApi from './useFetchMealDbApi';
import Pagination from './Pagination';
import SkeletonHeader from '../skeletons/SkeletonHeader';
import ThemeToggle from './ThemeToggle';
import Navbar from './Navbar/Navbar';
import * as FaIcons from 'react-icons/fa';
import { DarkModeContext } from '../contexts/DarkModeProvider';

const Home = () => {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const [
    { data, isLoading, isError },
    doFetch,
  ] = useFetchMealDbApi(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    { meals: [] }
  );

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.meals.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + postsPerPage);
      setminPageNumberLimit(minPageNumberLimit + postsPerPage);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % postsPerPage == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - postsPerPage);
      setminPageNumberLimit(minPageNumberLimit - postsPerPage);
    }
  };

  const handleLoadMore = () => {
    setPostsPerPage(postsPerPage + 5);
  };

  const theme = useContext(DarkModeContext);
  const { syntax, ui, bg, icon, isDark } = theme.mode;
  const loaderTheme = isDark ? 'dark' : 'light';

  return (
    <Fragment>
      <div
        className="bg-gray-500 text-white min-h-screen"
        style={{ background: ui, color: syntax }}
      >
        <Navbar />
        <div className="m-auto max-w-md sm:max-w-lg md:max-w-5xl flex flex-col items-center justify-center text-center mb-8">
          <div
            className="absolute top-5 right-10
          "
          >
            <ThemeToggle
              className="cursor-pointer focus:outline-none"
              id="random"
            />
          </div>

          <h1 className="font-black text-2xl logo-signature">Recipa</h1>
          <div className="flex flex-col items-center sm:flex-row">
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
                  style={{ background: bg, color: syntax }}
                />
                <button
                  className="search-btn border rounded-r"
                  type="submit"
                  style={{ background: bg, color: syntax }}
                >
                  <FaIcons.FaSearch className="h-5 w-5" />
                </button>
              </form>
              <Link to={'/RandomMeal/'}>
                <button
                  className="random-btn border rounded cursor-pointer ml-2.5"
                  id="random"
                  style={{ background: bg, color: syntax }}
                  title="Get Random Recipes"
                  aria-label="Get Random Recipes"
                >
                  <FaIcons.FaRandom className="h-5 w-5" />
                </button>
              </Link>
            </div>
            {/* <Link to={'/Categories/'}>
              <button
                className="random-btn border rounded cursor-pointer ml-2.5 mt-2"
                id="random"
                style={{ background: bg, color: syntax }}
              >
                <CollectionIcon className="h-5 w-5" />
              </button>
            </Link> */}
          </div>

          {isError && <div>Something went wrong ...</div>}
          {!currentPosts && <div>There is no result. Try again!</div>}

          {isLoading ? (
            [1, 2, 3, 4, 5].map((n) => (
              <SkeletonHeader key={n} theme={loaderTheme} />
            ))
          ) : (
            <div id="meals" className="meals">
              {currentPosts &&
                currentPosts.map((meal) => (
                  <div
                    className="meal hover:shadow-lg"
                    key={meal.idMeal}
                    style={{ background: bg, color: syntax }}
                  >
                    <Link to={`/MealInfo/${meal.idMeal}`}>
                      <img
                        src={meal.strMealThumb}
                        alt="stew"
                        className="h-40 sm:h-40 w-full object-cover hover:opacity-30 transition-opacity duration-200 ease-in"
                      />
                      <div className="m-4">
                        <span className="font-bold">{meal.strMeal}</span>
                        <span className="block text-sm">
                          {meal.strCategory}
                        </span>
                      </div>
                    </Link>

                    {/* <button
                      className="home-btn absolute top-1 left-1 sm:top-0 am:left-2 hover:bg-white  py-2 px-2 rounded-sm"
                      style={{ background: bg, color: syntax }}
                    >
                      <BookmarkIcon className="home-icon h-5 w-5  hover:text-black" />
                    </button> */}
                  </div>
                ))}
            </div>
          )}
        </div>

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={data.meals.length}
          paginate={paginate}
          indexOfFirstPost={indexOfFirstPost}
          indexOfLastPost={indexOfLastPost}
          handleNextbtn={handleNextbtn}
          handlePrevbtn={handlePrevbtn}
          currentPage={currentPage}
          handleLoadMore={handleLoadMore}
        />
      </div>
    </Fragment>
  );
};

export default Home;
