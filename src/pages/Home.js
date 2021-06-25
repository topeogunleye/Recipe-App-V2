import { Link } from 'react-router-dom';
import React, { Fragment, useState, useContext, useEffect } from 'react';
import useFetchMealDbApi from '../components/useFetchMealDbApi';
import Pagination from '../components/pagination/Pagination';
import SkeletonMeal from '../skeletons/SkeletonMeal';
import ThemeToggle from '../components/theme-toggle/ThemeToggle';
import Navbar from '../components/Navbar/Navbar';
import * as FaIcons from 'react-icons/fa';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import SearchBox from '../components/search-box/search-box';
import MealItem from '../components/meal/Meal';
import logo from '../logo.png';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import DarkToggle from '../components/theme-toggle/DarkToggleSideBar';

const Home = () => {
  const [data, setData] = useState({ meals: [] });
  const [query, setQuery] = useState('');

  const [url, setUrl] = useState(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


// Fetch Data with Native JavaScript Fetch
  // const [data, setData] = useState(null);

  // let fetchData = React.useCallback(async () => {
  //   const result = await fetch(`api/data/get`);
  //   const body = await result.json();
  //   setData(body);
  //   console.log(data)
  // },[data])

  // useEffect(() => {
  //   fetchData();
  // },[fetchData]);

  useEffect(() => {
    const fetchMeal = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchMeal();
  }, [url]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts =
    data.meals && data.meals.slice(indexOfFirstPost, indexOfLastPost);

  // Refresh page
  // Empty will Fetch the default results on the Homepage
  const empty = '';
  const refresh = () => {
    setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${empty}`);

    setCurrentPage(1);
  };

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

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

    setCurrentPage(1);

    event.preventDefault();
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
        <Navbar refresh={refresh} />
        <div className="m-auto lg:pl-32 max-w-md sm:max-w-lg md:max-w-5xl flex flex-col items-center justify-center text-center mb-8">
          <div
            className="absolute top-5 right-10
          "
          >
            <ThemeToggle
              className="cursor-pointer focus:outline-none"
              id="random"
            />
          </div>
         

          <SearchBox
            query={query}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />

          {isError && <div>Something went wrong ...</div>}
          {!currentPosts && <div>There is no result. Try again!</div>}

          {isLoading ? (
            [1, 2, 3, 4, 5].map((n) => (
              <SkeletonMeal key={n} theme={loaderTheme} />
            ))
          ) : (
            <div id="meals" className="meals">
              {currentPosts &&
                currentPosts.map((meal) => (
                  <MealItem meal={meal} key={uuidv4()} />
                ))}
            </div>
          )}
        </div>

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={data.meals && data.meals.length}
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
