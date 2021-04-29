import { Link } from 'react-router-dom';
import useFetchMealDbApi from './useFetchMealDbApi';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import chicken from './chicken.jpg';
import CategoryInfo from './CategoryInfo';
import ScrollMenu from 'react-horizontal-scrolling-menu';

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

  // const scroll = (scrollOffset) => {
  //   ref.current.scrollLeft += scrollOffset;
  // };

  return (
    <div className="relative">
      <div className="scrollmenu">
        {data.categories &&
          data.categories.map((category) => (
            <span className="scrollmenu-item " key={category.idCategory}>
              <Link
                to={`/CategoryInfo/${category.strCategory}`}
                className="lozenge btn-lozenge"
                onClick={() => {
                  doFetch(
                    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`
                  );
                }}
              >
                <img
                  className="meal-img"
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
      <svg
        className="w-6 h-6 inline-block arrow-left"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <svg
        className="w-6 h-6 inline-block arrow-right"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );
};
export default Categories;
