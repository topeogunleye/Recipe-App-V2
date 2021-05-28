import { Link } from 'react-router-dom';
import React, { Fragment, useState, useContext } from 'react';
import useFetchMealDbApi from './useFetchMealDbApi';
import Pagination from './pagination/Pagination';
import SkeletonHeader from '../skeletons/SkeletonHeader';
import ThemeToggle from './ThemeToggle';
import Navbar from './Navbar/Navbar';
import * as FaIcons from 'react-icons/fa';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import SearchBox from './search-box/search-box';
import MealItem from './meal/Meal';

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
  const { syntax, ui, bg, opacity, isDark } = theme.mode;
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

          <SearchBox
            query={query}
            handleChange={(event) => setQuery(event.target.value)}
            handleSubmit={(event) => {
              doFetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
              );

              event.preventDefault();
            }}
          />

          {isError && <div>Something went wrong ...</div>}
          {!currentPosts && <div>There is no result. Try again!</div>}

          {isLoading ? (
            [1, 2, 3, 4, 5].map((n) => (
              <SkeletonHeader key={n} theme={loaderTheme} />
            ))
          ) : (
            <div id="meals" className="meals">
              {currentPosts &&
                currentPosts.map((meal) => <MealItem meal={meal} />)}
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
