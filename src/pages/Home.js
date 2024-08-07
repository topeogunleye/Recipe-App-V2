import {
  Fragment, useState, useContext, useEffect,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Pagination from '../components/pagination/Pagination';
import SkeletonMeal from '../skeletons/SkeletonMeal';
import ThemeToggle from '../components/theme-toggle/ThemeToggle';
import Navbar from '../components/Navbar/Navbar';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import SearchBox from '../components/search-box/search-box';
import MealItem from '../components/meal/Meal';
import useFetchMealDbApi from '../components/useFetchMealDbApi';

const Home = () => {
  const [query, setQuery] = useState('');

  const [{ data, isLoading, isError }, doFetch] = useFetchMealDbApi(
    `https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/search.php?s=${query}`,
    { meals: [] },
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.meals && data.meals.slice(indexOfFirstPost, indexOfLastPost);

  // Refresh page
  // Query will Fetch the default results on the Homepage
  const refresh = () => {
    doFetch(
      `https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}
/latest.php`,
    );

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

    if ((currentPage - 1) % postsPerPage === 0) {
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
    doFetch(
      `https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/search.php?s=${query}`,
    );

    event.preventDefault();

    setCurrentPage(1);

    event.preventDefault();
  };

  const handleRandom = () => {
    // fetch random meal recipes
    doFetch(
      `https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/randomselection.php`,
    );
  };

  useEffect(() => {
    doFetch(
      `https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/latest.php`,
    );
  }, [doFetch]);

  const theme = useContext(DarkModeContext);
  const { syntax, ui, isDark } = theme.mode;
  const loaderTheme = isDark ? 'dark' : 'light';

  return (
    <>
      <div
        className="bg-gray-500 text-white min-h-screen transition-all duration-1000 ease-out"
        style={{ background: ui, color: syntax }}
      >
        <Navbar refresh={refresh} />
        <div className="m-auto lg:pl-32 max-w-md sm:max-w-lg md:max-w-5xl flex flex-col items-center justify-center text-center mb-8 transition-all duration-1000 ease-out">
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
            handleRandom={handleRandom}
          />

          {isError && <div>Something went wrong ...</div>}
          {!currentPosts && <div>There is no result. Try again!</div>}

          {isLoading ? (
            [1, 2, 3, 4, 5].map((n) => (
              <SkeletonMeal key={n} theme={loaderTheme} />
            ))
          ) : (
            <div id="meals" className="meals transition-all duration-1000 ease-out">
              {currentPosts
                                && currentPosts.map((meal) => (
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
    </>
  );
};

export default Home;
