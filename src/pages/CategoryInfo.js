import { useParams } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import useFetchMealDbApi from '../components/useFetchMealDbApi';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Pagination from '../components/pagination/Pagination';
import Navbar from '../components/Navbar/Navbar';
import * as HiIcons from 'react-icons/hi';
import MealItem from '../components/meal/Meal';
import ThemeToggle from '../components/theme-toggle/ThemeToggle';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import SkeletonMeal from '../skeletons/SkeletonMeal';

const CategoryInfo = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const { strCategory } = useParams();

  const [{ data, isLoading, isError }, doFetch] = useFetchMealDbApi();

  useEffect(
    () =>
      doFetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`
      ),
    [doFetch, strCategory, data]
  );

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = data.meals.slice(indexOfFirstPost, indexOfLastPost);

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

  const theme = useContext(DarkModeContext);
  const { syntax, ui, bg, icon, isDark } = theme.mode;
  const loaderTheme = isDark ? 'dark' : 'light';

  return (
    <div
      className="bg-gray-800 sm:bg-gray-500 text-white min-h-screen"
      style={{ background: ui, color: syntax }}
    >
      <Navbar />
      <div className="m-auto lg:pl-32 max-w-5xl flex flex-col items-center justify-center text-center mb-8">
        <h3 className="text-2xl font-bold">{strCategory}</h3>
        <div id="meals" className="meals-cat">
          {isError && <div>Something went wrong ...</div>}
          {isLoading ? (
            // <div>Loading ...</div>
            [1, 2, 3, 4, 5].map((n) => (
              <SkeletonMeal Key={n} theme={loaderTheme} />
            ))
          ) : (
            <div id="meals" className="meals">
              {data &&
                data.meals
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((meal) => <MealItem meal={meal} />)}
            </div>
          )}
        </div>

        <div
          className="absolute top-5 right-10
          "
        >
          <ThemeToggle
            className="cursor-pointer focus:outline-none"
            id="random"
          />
        </div>
      </div>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data && data.meals.length}
        paginate={paginate}
        indexOfFirstPost={indexOfFirstPost}
        indexOfLastPost={indexOfLastPost}
        handleNextbtn={handleNextbtn}
        handlePrevbtn={handlePrevbtn}
        currentPage={currentPage}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default CategoryInfo;
