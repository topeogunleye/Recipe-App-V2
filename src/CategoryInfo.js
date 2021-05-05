import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import useFetchMealDbApi from './useFetchMealDbApi';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import SkeletonHeader from './skeletons/SkeletonHeader';
import { HomeIcon, ChevronLeftIcon } from '@heroicons/react/solid';
import Pagination from './components/Pagination';

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

    if ((currentPage - 1) % postsPerPage == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - postsPerPage);
      setminPageNumberLimit(minPageNumberLimit - postsPerPage);
    }
  };

  const handleLoadMore = () => {
    setPostsPerPage(postsPerPage + 5);
  };

  return (
    <div className="bg-gray-800 sm:bg-gray-500 text-white min-h-screen">
      <div className="m-auto max-w-5xl flex flex-col items-center justify-center text-center">
        <h3 className="text-2xl font-bold">{strCategory}</h3>
        <div id="meals" className="meals-cat">
          {isError && <div>Something went wrong ...</div>}
          {isLoading ? (
            // <div>Loading ...</div>
            [1, 2, 3, 4, 5].map((n) => <SkeletonHeader Key={n} theme="dark" />)
          ) : (
            <div id="meals" className="meals">
              {data &&
                data.meals
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((meal) => (
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
        </div>
        <button
          className="home-btn absolute top-1 left-1 sm:left-1 xl:top-2 xl:right-2  hover:bg-white  py-2 px-2 bg-gray-600 sm:bg-gray-700 rounded-sm"
          onClick={() => {
            history.goBack(-1);
          }}
        >
          <ChevronLeftIcon className="home-icon h-5 w-5 text-white  hover:text-black" />
        </button>
        <Link to="/">
          <button className="home-btn absolute top-1 right-1 sm:right-1 xl:top-2 xl:right-2  hover:bg-white  py-2 px-2 sm:px-2 lg:px-2 bg-gray-600 sm:bg-gray-700 rounded-sm">
            <HomeIcon className="home-icon h-5 w-5 text-white  hover:text-black" />
          </button>
        </Link>
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
