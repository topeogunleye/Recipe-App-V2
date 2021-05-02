import { Link } from 'react-router-dom';
import useFetchMealDbApi from './useFetchMealDbApi';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Categories = ({ ref = 'scroller' }) => {
  const history = useHistory();

  const [
    { data, isLoading, isError },
    doFetch,
  ] = useFetchMealDbApi(
    `https://www.themealdb.com/api/json/v1/1/categories.php`,
    { categories: [] }
  );

  if (data) {
    console.log(data);
  }

  return (
    <div className="max-w-3xl mx-auto text-center my-2">
      <h3 className="text-lg text-gray-800">Categories</h3>
      <div className="category">
        {data.categories &&
          data.categories.map((category) => (
            <span className="mx-auto" key={category.idCategory}>
              <Link to={`/CategoryInfo/${category.strCategory}`} className="">
                <img
                  className="cat-img"
                  src={category.strCategoryThumb}
                  alt={category.strMeal}
                />
                <h2 className="categories">{category.strCategory}</h2>
              </Link>
            </span>
          ))}
      </div>
      <button
        className="absolute top-1 left-1 sm:top-4 sm:left-4 text-white hover:bg-white hover:text-black bg-gray-900 sm:bg-gray-700  py-1 px-1 sm:py-2 sm:px-4 md:hidden xl:block"
        onClick={() => {
          history.go(-1);
        }}
      >
        &laquo; Go Back
      </button>
    </div>
  );
};
export default Categories;
