import { Link } from 'react-router-dom';
import useFetchMealDbApi from './useFetchMealDbApi';
import { useState, useEffect } from 'react';

const Categories = ({ ref = 'scroller' }) => {
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
    <div className="relative grid items-baseline">
      <div className="scrollmenu flex md:flex-col w-screen md:w-full overflow-auto">
        <h3 className="text-3xl font-bold text-center md:mt-32 mb-2 border-b border-gray-200 pb-2 hidden md:block">
          Categories
        </h3>
        {data.categories &&
          data.categories.map((category) => (
            <span className="scrollmenu-item " key={category.idCategory}>
              <Link
                to={`/CategoryInfo/${category.strCategory}`}
                className="lozenge btn-lozenge"
              >
                <img
                  className="meal-img-cat-list"
                  src={category.strCategoryThumb}
                  alt={category.strMeal}
                />
                <h2 className="font-regular text-base">
                  {category.strCategory}
                </h2>
              </Link>
            </span>
          ))}
      </div>
    </div>
  );
};
export default Categories;
